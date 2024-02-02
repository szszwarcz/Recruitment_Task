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
  launchpadId:any;
  launchpad:any;
  launchpads2 : any[] = [];
  launchpads : any;
  launches2 : any[] = [];
  launches : any;
  dataSource : any [] = [];


  

  constructor(private route: ActivatedRoute, private dataService: DataPassingServiceService) { }

  ngOnInit(){

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
    this.dataSource = this.launches;
    console.log(this.launchpad);


  }

}