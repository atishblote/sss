import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // baseUrl:string= 'http://localhost:3000/front'
  baseUrl:string= 'https://satt-matka.matkalive.co/front'

  apiKey:any
  constructor(private http: HttpClient) { }

  // private getHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     'X-RapidAPI-Key': this.apiKey,
  //     'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
  //   });
  // }

  private getSiteHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  // private siteHeadersToken(token:string): HttpHeaders {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Token': token
  //   });
  // }

  getWithoutToken(endpoint:string){
    const url = `${this.baseUrl}/${endpoint}`
    const headers = this.getSiteHeaders()
    return this.http.get(url, { headers })
  }
}
