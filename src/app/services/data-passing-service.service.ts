import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassingServiceService {
  getLaunchesStorageKey(): string {
    return this.LAUNCHES_STORAGE_KEY;
  }


  getLaunchpadsStorageKey(): string {
    return this.LAUNCHPADS_STORAGE_KEY;
  }
  private readonly LAUNCHPADS_STORAGE_KEY = 'launchpads3';
  private readonly LAUNCHES_STORAGE_KEY = 'launches3';
  constructor() { 

  }


  setSharedLaunchpads(launchpads: any[]): Observable<any> {
    return of(null).pipe(
      tap(() => localStorage.setItem(this.LAUNCHPADS_STORAGE_KEY, JSON.stringify(launchpads))),
      catchError((error) => {
        console.error('Error saving launchpads:', error);
        return of(null);
      })
    );
  }
  
  setSharedLaunches(launches: any[]): Observable<any> {
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
      const launchpad = launches.find((item: { id: string; }) => item.id === launchpadId);
      return of(launchpad || null);
    }
    return of(null);
  }
  getLaunchpadsByNameAndRegion(region: string, name: string): Observable<any | null> {
    const storedData = localStorage.getItem(this.LAUNCHPADS_STORAGE_KEY);
  
    if (storedData && storedData.length>0) {
      const launches = JSON.parse(storedData);
      if(region === '' && name === ''){
        return of(launches || null);
      }
      const regexName = new RegExp(name, 'i');
      const regexRegion = new RegExp(region, 'i');
      const matchingLaunchpads = launches.filter((item: { name: string; region: string; }) =>
      (name === '' || regexName.test(item.name)) &&
      (region === '' || regexRegion.test(item.region))
);
      return of(matchingLaunchpads || null);
    }
    return of(null);
  }
  
}
