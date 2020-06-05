import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _findUsersUrl:string = 'https://localhost:44397/api/LDAP/FindUser';
  private _getUserFromIdUrl:string =  'https://localhost:44397/api/LDAP/FindUser';
  constructor(private http: HttpClient) { }
 
  FindUsers(filter: String): Observable<User[]>{
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });    
    return this.http.post<User[]>(this._findUsersUrl,`\"${filter}\"`,{headers:reqHeader, responseType: 'json'});
  } 
  GetUserFromID(filter: String): Observable<User[]>{    
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });    
    return this.http.post<User[]>(this._getUserFromIdUrl,`\"${filter}\"`,{headers:reqHeader, responseType: 'json'});
  }
 }