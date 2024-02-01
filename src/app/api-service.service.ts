import { LaunchPad } from './launch-pad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private launchpadsUrl = 'https://api.spacexdata.com/v4/launchpads';
  private launchesUrl = 'https://api.spacexdata.com/v4/launches';

  private url = 'https://en.wikipedia.org/w/api.php';

  constructor(private http : HttpClient) {}

  wikiSearch(data:any){
    return this.http.get(this.url,{
      params: {
        action: "query",
        format: "json",
        list: "search",
        srsearch: data,
        origin: '*',
        srlimit: 10
      }
    })
  }

  getLaunchpadData() : Observable<any>{
    return this.http.get(this.launchpadsUrl);
  }

  getLaunchesData() : Observable<any>{
    return this.http.get(this.launchesUrl);
  }

  }
