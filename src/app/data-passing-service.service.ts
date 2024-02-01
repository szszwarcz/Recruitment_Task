import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassingServiceService {
  private sharedLaunchpads = new BehaviorSubject<any[]>([]);
  sharedLaunchpads$ = this.sharedLaunchpads.asObservable();
  private sharedLaunches:any;
  constructor() { 

  }
  setSharedData(dataArray: any[]) {
    this.sharedLaunchpads.next(dataArray);
  }

  getSharedLaunchpadsById(id:any):any{
    const launchpad = this.sharedLaunchpads.value.find((item: { id: any; }) => item.id === id);
    return launchpad;
  }

  getSharedLaunchpads():Observable<any[]> {
    return this.sharedLaunchpads$;
  }
  getSharedLaunches():Observable<any[]> {
    return of(this.sharedLaunches);
  }
}
