import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPassingServiceService } from '../data-passing-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-launch-pad',
  templateUrl: './launch-pad.component.html',
  styleUrls: ['./launch-pad.component.css']
})
export class LaunchPadComponent {
  index : number = 0;
  launchpadId:any;
  launchpad:any;
  launches2 : any[] = [];
  filteredLaunches : any[] = [];
  launches : any;
  dataSource : any [] = [];
  displayedColumns: string[] = ['no', 'name', 'date', 'details'];


  

  constructor(private route: ActivatedRoute, private dataService: DataPassingServiceService) { }

  ngOnInit(){

    this.dataService.getSharedLaunches().subscribe(
      (launches) => {
        this.launches2 = launches;
      }
    );

    this.route.queryParams.subscribe(params => {
      this.launchpadId = params['id'];
    });

    this.dataService.getLaunchpadById(this.launchpadId).subscribe(
      (data) => {
        this.launchpad = data;
      },
      (error) => {
        console.error('Error fetching launchpad:', error);
      }
    );
    this.filteredLaunches = this.launches2.filter(((item: { launchpad: any; }) => item.launchpad === this.launchpadId));
    
    this.dataSource = this.filteredLaunches;
    console.log(this.filteredLaunches);
    this.index = this.filteredLaunches.length;
    this.removeEmptyRecords();


  }
  removeEmptyRecords() {
    this.dataSource = this.dataSource.filter(element => 
      element.name && element.date && element.details
    );
  }

}