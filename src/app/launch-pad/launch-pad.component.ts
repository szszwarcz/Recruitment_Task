import { ApiServiceService } from '../services/api-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPassingServiceService } from '../services/data-passing-service.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-launch-pad',
  templateUrl: './launch-pad.component.html',
  styleUrls: ['./launch-pad.component.css']
})
export class LaunchPadComponent {
  toggleDisplayedText = 'Hide empty data'
  isSlideToggleChecked = false;
  pageIndex = 0;
  index : number = 0;
  pageSizeOptions: number[] = [5,10,20,30];
  pageSize = 10; 
  wikiLink : any;
  loading: boolean = true;
  launchpadId:any;
  launchpad:any;
  launches : any[] = [];
  filteredLaunches : any[] = [];
  pagedLaunches: any [] = [];
  dataSource : any [] = [];
  dataSourceSaved: any[] = [];
  displayedColumns: string[] = ['no', 'name', 'date', 'details'];
  

  constructor(private route: ActivatedRoute, private dataService: DataPassingServiceService, private apiService : ApiServiceService) { }

  ngOnInit(){

    //Fetching all launches
    this.dataService.getSharedLaunches().subscribe(
      (launches) => {
        this.launches = launches;
      }
    );

    //Fetching launchpad id by route
    this.route.queryParams.subscribe(params => {
      this.launchpadId = params['id'];
    });

    //Fetching launchpad by id from storage -- can be done through api call by quering
    this.dataService.getLaunchpadById(this.launchpadId).subscribe(
      (launchpadById) => {
        this.launchpad = launchpadById;
      },
      (error) => {
        console.error('Error fetching launchpad:', error);
      }
    );

    //Filtering and reassigning values
    this.filteredLaunches = this.launches.filter(((launch: { launchpad: any; }) => launch.launchpad === this.launchpadId));
    this.dataSource = this.filteredLaunches;
    this.index = this.filteredLaunches.length;
    //this.removeEmptyRecords();

    //Fetching wikipedia article id through wikipedia api
    this.apiService.wikiSearch(this.getLast5WordsFromFullName(this.launchpad.full_name)).subscribe(data => {
      this.wikiLink = data.query.search;
    })
    this.dataSourceSaved = this.dataSource;
    this.updatePagedLaunches(0);
    setTimeout(() => {
      this.loading = false; // Set loading to false after the delay
    }, 500);
  }

  onSlideToggleChange(event: MatSlideToggleChange): void {
    this.isSlideToggleChecked = event.checked;

    if (this.isSlideToggleChecked) {
      this.removeEmptyRecords();
      this.toggleDisplayedText = "Show empty data";
    } else {
      this.reinstateEmptyRecords();
      this.toggleDisplayedText = "Hide empty data";
    }
    this.updatePagedLaunches(0);
  }

  reinstateEmptyRecords(){
    this.dataSource = this.dataSourceSaved;
  }

  removeEmptyRecords() {
    this.dataSource = this.dataSourceSaved.filter(element => 
      element.name && element.date && element.details
    );
  }

  getLast5WordsFromFullName(launchpadFullName: string): string {
    const words = launchpadFullName.split(' ');
    const launchpadsLast5Words = words.slice(-5).join(' ');
    return launchpadsLast5Words;
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * this.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedLaunches(startIndex);
  }

  updatePagedLaunches(startIndex: number): void {
    this.pagedLaunches = this.dataSource.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

}