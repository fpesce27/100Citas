import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private url : string = environment.apiUrl;
  id : number = 1;

  constructor(
    private http : HttpClient
  ) { }

  public datesGet(){
    return this.http.get(this.url + "/user/" + this.id + "/dates");
  }

  public datePost(date : Date){
    return this.http.post(this.url + "/" + this.id + "/date", date);
  }

  public dateDelete(date : number){
    return this.http.delete(this.url + "/user/" + this.id + "/date/" + date);
  }

  public datePut(date : Date, date_id : number){
    return this.http.put(this.url + "/user/" + this.id + "/date/" + date_id, date);
  }
}
