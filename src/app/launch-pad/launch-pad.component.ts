import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataPassingServiceService } from '../data-passing-service.service';

@Component({
  selector: 'app-launch-pad',
  templateUrl: './launch-pad.component.html',
  styleUrls: ['./launch-pad.component.css']
})
export class LaunchPadComponent {
  launchpadId:any;
  launchpad:any;
  launches:any;

  constructor(private route: ActivatedRoute, private dataService: DataPassingServiceService) { }

  ngOnInit(){
    this.dataService.sharedLaunchpads$.subscribe(data => {
      this.launchpad = data;
    })

    this.route.queryParams.subscribe(params => {
      this.launchpadId = params['id'];
    });

    this.launchpad  = this.dataService.getSharedLaunchpadsById(this.launchpadId);

  }
}