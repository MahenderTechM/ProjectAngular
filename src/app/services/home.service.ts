import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
 private GetHomePageListUrl:string=environment.Base_Url+"/Home/GetHomePageDetails";
  constructor(private http:HttpClient) { }
  GetHomeList() {
    //return this.http.get<Prioritization[]>('https://netqaappweb.amat.com/NMACAPTRACKER_API/api/AdminTables/');
   return this.http.get(this.GetHomePageListUrl);
 }
}
