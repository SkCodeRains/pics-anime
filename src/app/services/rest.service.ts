import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExclude } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get('https://api.waifu.pics/endpoints');
  }
  getImages(excludes: IExclude, url: string): Observable<any> {
    return this.http.post('https://api.waifu.pics/many/' + url, excludes);
  }
  rum(url: string): Observable<any> {
    let data = {
      "resources": [
        {
          "n": "https://cloudflareinsights.com/cdn-cgi/rum",
          "s": 197624.3,
          "d": 45.4,
          "i": "xmlhttprequest",
          "p": "",
          "rs": 0,
          "re": 0,
          "fs": 197624.3,
          "ds": 0,
          "de": 0,
          "cs": 0,
          "ce": 0,
          "qs": 0,
          "ps": 0,
          "pe": 197669.7,
          "ws": 0,
          "ss": 0,
          "ts": 0,
          "ec": 0,
          "dc": 0
        },
        {
          "n": "https://api.waifu.pics/many/" + url,
          "s": 197637,
          "d": 1261.3,
          "i": "xmlhttprequest",
          "p": "",
          "rs": 0,
          "re": 0,
          "fs": 197637,
          "ds": 0,
          "de": 0,
          "cs": 0,
          "ce": 0,
          "qs": 0,
          "ps": 0,
          "pe": 198898.3,
          "ws": 0,
          "ss": 0,
          "ts": 0,
          "ec": 0,
          "dc": 0
        }
      ],
      "referrer": "https://waifu.pics/more",
      "eventType": 1,
      "firstPaint": 3504.800000011921,
      "firstContentfulPaint": 3504.800000011921,
      "startTime": 1712898218929.7,
      "versions": {
        "js": "2023.10.0",
        "timings": 1
      },
      "pageloadId": "662e8482-d228-44ed-92eb-18e55dab65a9",
      "location": "https://waifu.pics/" + url,
      "timingsV2": {
        "nextHopProtocol": "h3"
      },
      "siteToken": "e39f5f45e6d64784bef4867c1e804fb7",
      "st": 2
    }
    return this.http.post('https://cloudflareinsights.com/cdn-cgi/rum', data)
  }
}
