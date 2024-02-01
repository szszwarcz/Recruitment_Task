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
  panelOpenState = true;
  launchpadData$ : any;
  constructor(private apiDataService : ApiServiceService, private router:Router, private dataService:DataPassingServiceService){
  }
  
  mergedData : any;
  firstlink : any;
  launchpads2 : any[] = [];
  launchpads : any;
  launches2 : any[] = [];
  launches : any;


  ngOnInit(): void {
     this.apiDataService.getLaunchpadData().subscribe((firstApiResponse) => {
      const launchpads = firstApiResponse.map((item: {
        id : any;
        details: any;
        images: any;
        launches: any; 
        full_name: any;
        name : any;
          }) => ({
        full_name: item.full_name,
        launches: item.launches,
        img: item.images.large,
        details: item.details,
        id : item.id,
        name : item.name
      }));
      this.dataService.setSharedLaunchpads(launchpads);
      //this.launchpads2 = launchpads;
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
      this.dataService.setSharedLaunches(launches);
      //this.launches2 = launches;
    })

    this.dataService.getSharedLaunchpads().subscribe(
      (launchpads) => {
        // Handle the retrieved launchpads data
        this.launchpads2 = launchpads;
      }
    );
    this.dataService.getSharedLaunches().subscribe(
      (launches) => {
        this.launches2 = launches;
      }
    );
  }
  

}
