import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { PageEvent } from '@angular/material/paginator';
import { DataPassingServiceService } from '../data-passing-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit{
  wikiLinks :any[] = [];
  rowHeight = 600;
  imgSize = 400;
  cols: number = 3;
  value = '';
  value2 = '';
  pageSizeOptions: number[] = [1,2,3,4,5,6];
  pageSize = 5; 
  panelOpenState = true;
  pagedLaunchpads2: any[] = []; 
  
  launchpads2 : any[] = [];
  launches2 : any[] = [];

  constructor(private apiDataService : ApiServiceService, private dataService:DataPassingServiceService, private breakpointObserver: BreakpointObserver){
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
        wikiLink: any;
      }) => ({
        full_name: item.full_name,
        launches: item.launches,
        img: item.images.large,
        details: item.details,
        id : item.id,
        name : item.name,
        region : item.region,
        status : item.status,
        wikiLink : " "
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

    console.log(this.wikiLinks);

    this.dataService.getSharedLaunches().subscribe(
      (launches) => {
        this.launches2 = launches;
      }
    );

    this.dataService.getSharedLaunchpads().subscribe((launchpads) => {
      this.launchpads2 = launchpads;
      this.updatePagedLaunchpads(0); // Initialize with the first page
    });
  
    this.updateCols(); // Initial call to set the initial value

    // Subscribe to window resize events
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(() => {
      this.updateCols(); // Call the update function on resize
    });
    
    console.log(this.pagedLaunchpads2);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateCols(); // Call the update function on window resize
  }
  updateCols() {
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
      this.updateCols();
    } else if (this.pageSize  === 2) {
      this.cols = 2;
      this.updateCols();
    } else {
      this.cols = 3;
      this.updateCols();
    }
  }

  updatePagedLaunchpads(startIndex: number): void {
    this.pagedLaunchpads2 = this.launchpads2.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }
  onKey(event: any): void {
    this.value = event.target.value;
    this.performSearch();
  }
  
  onKey2(event: any): void {
    this.value2 = event.target.value;
    this.performSearch();
  }
  
  performSearch(): void {
    if (this.value || this.value2) {
      this.dataService.getLaunchpadsByNameAndRegion(this.value, this.value2).subscribe((data: any[]) => {
        this.launchpads2 = data;
        this.updatePagedLaunchpads(0);
      });
    } else {
      // If both fields are empty, fetch the original data
      this.fetchData();
    }
  }
  
  fetchData(): void {
    this.dataService.getSharedLaunchpads().subscribe((launchpads) => {
      this.launchpads2 = launchpads;
      this.updatePagedLaunchpads(0);
    });
  }
}
