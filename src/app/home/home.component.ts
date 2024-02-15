import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { PageEvent } from '@angular/material/paginator';
import { DataPassingServiceService } from '../services/data-passing-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit{
  rowHeight = 600;
  imgSize = 400;
  cols: number = 3;
  region = '';
  name = '';
  pageSizeOptions: number[] = [1,2,3,4,5,6];
  pageSize = 5; 
  pagedLaunchpads: any[] = []; 
  launchpads : any[] = [];

  constructor(private apiDataService : ApiServiceService, private dataService:DataPassingServiceService, private breakpointObserver: BreakpointObserver){
  }

  ngOnInit(): void {
    
    //Mapping and storing all data related to launchpads
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
        wikiLink: any;
        latitude : any;
        longitude : any;
        }) => ({
          full_name: item.full_name,
          launches: item.launches,
          img: item.images.large,
          details: item.details,
          id : item.id,
          name : item.name,
          region : item.region,
          status : item.status,
          wikiLink : " ",
          longitude : item.longitude,
          latitude : item.latitude
        }));
      this.dataService.setSharedLaunchpads(launchpads).subscribe();
      })

      //Mapping and storing all data related to launches
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
      this.dataService.setSharedLaunches(launches).subscribe();
    })

    //Fetching launchpads data
    this.dataService.getSharedLaunchpads().subscribe((launchpads) => {
      this.launchpads = launchpads;
      this.updatePagedLaunchpads(0);
      this.updateColumnSizeInCards();
    });

    // Subscribe to window resize events
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(() => {
      this.updateColumnSizeInCards();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateColumnSizeInCards(); // Call the update function on window resize
  }

  updateColumnSizeInCards() {
    if (this.pageSize === 1) {
      if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
        this.cols = 1;
        this.imgSize = 350;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
        this.cols = 1;
        this.imgSize = 550;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
        this.cols = 1;
        this.imgSize = 550;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
        this.cols = 1;
        this.imgSize = 550;
      } else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
        this.cols = 1;
        this.imgSize = 550;
      }
    }
    else if (this.pageSize === 2){
      if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
        this.cols = 1;
        this.imgSize = 350;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
        this.cols = 1;
        this.imgSize = 500;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
        this.cols = 2;
        this.imgSize = 400;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
        this.cols = 2;
        this.imgSize = 500;
      } else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
        this.cols = 2;
        this.imgSize = 500;
      }
    }
    else if(this.pageSize >=3){
      if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
        this.cols = 1;
        this.imgSize = 350;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
        this.cols = 1;
        this.imgSize = 500;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
        this.cols = 2;
        this.imgSize = 400;
      } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
        this.cols = 3;
        this.imgSize = 350;
      } else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
        this.cols = 3;
        this.imgSize = 350;
      }
    }
    this.rowHeight = this.imgSize+ 200;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * this.pageSize;
    this.updatePagedLaunchpads(startIndex);
    
    if (this.pageSize === 1) {
      this.cols = 1;
      this.updateColumnSizeInCards();
    } else if (this.pageSize  === 2) {
      this.cols = 2;
      this.updateColumnSizeInCards();
    } else {
      this.cols = 3;
      this.updateColumnSizeInCards();
    }
  }
  updatePagedLaunchpads(startIndex: number): void {
    this.pagedLaunchpads = this.launchpads.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
  //region - region name - name
  getLaunchpadsByNameAndRegion(): void {
    if (this.region || this.name) {
      this.dataService.getLaunchpadsByNameAndRegion(this.region, this.name).subscribe((data: any[]) => {
        this.launchpads = data;
        this.updatePagedLaunchpads(0);
      });
    } else {
      this.updateLaunchpads();
    }
  }
  
  updateLaunchpads(): void {
    this.dataService.getSharedLaunchpads().subscribe((launchpads) => {
      this.launchpads = launchpads;
      this.updatePagedLaunchpads(0);
    });
  }

  onRegionInput(event: any): void {
    this.region = event.target.value;
    this.getLaunchpadsByNameAndRegion();
  }
  
  onNameInput(event: any): void {
    this.name = event.target.vlaue;
    this.getLaunchpadsByNameAndRegion();
  }
  
  
}
