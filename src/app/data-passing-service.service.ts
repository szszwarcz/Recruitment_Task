import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassingServiceService {
  private readonly LAUNCHPADS_STORAGE_KEY = 'launchpads';
  private readonly LAUNCHES_STORAGE_KEY = 'launches';
  private sharedLaunchpads :any;
  private sharedLaunches :any;
  constructor() { 

  }


  setSharedLaunchpads(launchpads: any): Observable<any> {
    return of(null).pipe(
      tap(() => localStorage.setItem(this.LAUNCHPADS_STORAGE_KEY, JSON.stringify(launchpads))),
      catchError((error) => {
        console.error('Error saving launchpads:', error);
        return of(null);
      })
    );
  }

  setSharedLaunches(launches: any): Observable<any> {
    return of(null).pipe(
      tap(() => localStorage.setItem(this.LAUNCHES_STORAGE_KEY, JSON.stringify(launches))),
      catchError((error) => {
        console.error('Error saving launches:', error);
        return of(null);
      })
    );
  }

  getSharedLaunchpads(): Observable<any | null> {
    const storedData = localStorage.getItem(this.LAUNCHPADS_STORAGE_KEY);
    return of(storedData ? JSON.parse(storedData) : null);
  }

  getSharedLaunches(): Observable<any | null> {
    const storedData = localStorage.getItem(this.LAUNCHES_STORAGE_KEY);
    return of(storedData ? JSON.parse(storedData) : null);
  }

  
  getLaunchpadById(launchpadId: string): Observable<any | null> {
    const storedData = localStorage.getItem(this.LAUNCHPADS_STORAGE_KEY);
    
    if (storedData) {
      const launches = JSON.parse(storedData);

      // Find the launchpad with the specified launchpadId
      const launchpad = launches.find((item: { id: string; }) => item.id === launchpadId);

      return of(launchpad || null);
    }

    return of(null);
  }
  
}
