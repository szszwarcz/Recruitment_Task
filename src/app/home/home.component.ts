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
  searchResults : any = [];
  searchResult: any | null = null;

  mappedLaunches :any[] = [];

  filterValue: string;
  launchpadData$ : any;
  constructor(private apiDataService : ApiServiceService, private router:Router, private dataService:DataPassingServiceService){
    this.filterValue = ' ';
    this.pageEvent = new PageEvent();
  }
  mappedArray : any[] = [];
  mergedData : any;
  firstlink : any;
  launchpads2 : any[] = [];
  launchpads : any;
  launches2 : any[] = [];
  launches : any;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  mergeData(): void {
    if (this.launchpads && this.searchResults) {
      this.mergedData = this.launchpads.map((item1: { full_name: any; }) => {
        const matchingItem = this.searchResults.find((item2: { title: any; }) => item1.full_name === item2.title);
        return { ...item1, ...matchingItem };
      });
    }
  }
  navigateToNextComponent(item: any): void {
    // Use router.navigate to navigate with queryParams
    this.router.navigate(['/lauchpad-component'], { queryParams: { element: item } });
  }

  ngOnInit(): void {
     this.apiDataService.getLaunchpadData().subscribe((firstApiResponse) => {
      this.launchpads2 = firstApiResponse.map((item: {
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
     })


     this.apiDataService.getLaunchesData().subscribe((secondApiResponse) =>{
      this.launches2 = secondApiResponse.map((item: {
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
     })


     this.apiDataService.getLaunchpadData().subscribe((data) => {
      this.launchpads = data;
     })

     this.apiDataService.getLaunchesData().subscribe((data) => {
      this.launches = data;
     })

     this.apiDataService.wikiSearch('Vandenberg Space Force Base Space Launch Complex 4E').subscribe((data : any) => {
      this.searchResults = data.query.search;
     })

     this.dataService.setSharedData(this.launchpads2);



  }

}
