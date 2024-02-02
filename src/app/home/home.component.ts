import { ApiDataServiceService } from './../../../../SpaceX_Lunchpad/src/app/api-data-service.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { PageEvent } from '@angular/material/paginator';
import {MatFormFieldModule,} from '@angular/material/form-field';
import { LaunchPad } from '../launch-pad';
import { merge } from 'cheerio/lib/static';
import { Launches } from '../launches';
import { Router } from '@angular/router';
import { DataPassingServiceService } from '../data-passing-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit{
  value = '';
  value2 = '';
  pageSizeOptions: number[] = [1,2,3,4,5,6];
  panelOpenState = true;
  pagedLaunchpads2: any[] = []; 
  pageSize = 5; 
  launchpads2 : any[] = [];
  launches2 : any[] = [];

  constructor(private apiDataService : ApiServiceService, private dataService:DataPassingServiceService){
  }

  ngOnInit(): void {
     this.apiDataService.getLaunchpadData().subscribe((firstApiResponse) => {
      const launchpads = firstApiResponse.map((item: {
        full_name: any;
        details: any;
        images: any;
        launches: any; 
        id : any;
        name : any;
        region : any;
        status: any;
      }) => ({
        full_name: item.full_name,
        launches: item.launches,
        img: item.images.large,
        details: item.details,
        id : item.id,
        name : item.name,
        region : item.region,
        status : item.status
      }));
      this.dataService.setSharedLaunchpads(launchpads).subscribe(
        (result) => {
          console.log('Observable executed successfully:', result);
        },
        (error) => {
          console.error('Observable error:', error);
        }
      );
     })

     this.apiDataService.getLaunchesData().subscribe((secondApiResponse) =>{
      const launches = secondApiResponse.map((item: {
        details: any;
        static_fire_date_utc: any;
        name: any; 
        id: any;
        launchpad : any;
          }) => ({
        name: item.name,
        id: item.id,
        date: item.static_fire_date_utc,
        details: item.details,
        launchpad: item.launchpad
      }));
      this.dataService.setSharedLaunches(launches).subscribe(
        (result) => {
          console.log('Observable executed successfully:', result);
        },
        (error) => {
          console.error('Observable error:', error);
        }
      );
    })

    this.dataService.getSharedLaunchpads().subscribe((launchpads) => {
      this.launchpads2 = launchpads;
    });
    this.dataService.getSharedLaunches().subscribe(
      (launches) => {
        this.launches2 = launches;
      }
    );

    this.dataService.getSharedLaunchpads().subscribe((launchpads) => {
      this.launchpads2 = launchpads;
      this.updatePagedLaunchpads(0); // Initialize with the first page
    });
  }


  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * this.pageSize;
    this.updatePagedLaunchpads(startIndex);
    
  }

  updatePagedLaunchpads(startIndex: number): void {
    this.pagedLaunchpads2 = this.launchpads2.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
  onKey(event: any) : void {
    this.value = event.target.value;
    this.dataService.getLaunchpadsByRegion(this.value, this.value2).subscribe((data: any[]) => {
      this.launchpads2 = data;
      this.updatePagedLaunchpads(0);
    })
  }
  onKey2(event: any) : void {
    this.value2 = event.target.value;
    this.dataService.getLaunchpadsByName(this.value2, this.value).subscribe((data: any[]) => {
      this.launchpads2 = data;
      this.updatePagedLaunchpads(0);
    })
  }


  updateLaunhpadsSearch(){

  }
}
