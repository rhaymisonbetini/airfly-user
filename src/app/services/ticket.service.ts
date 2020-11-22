import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient,
    private api: UrlService
  ) { }

  getTickets() {
    let header: any = {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token'),
        Email: localStorage.getItem('email'),
        id: sessionStorage.getItem('id')
      })
    }

    return this.http.get(this.api.url + `tickets`, header);
  }

  getTicketById(id: any) {
    let header: any = {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token'),
        Email: localStorage.getItem('email'),
        id: sessionStorage.getItem('id')
      })
    }
    return this.http.get(this.api.url + `ticket/${id}`, header);
  }

  countTyTickets() {
    let header: any = {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('token'),
        Email: localStorage.getItem('email'),
        id: sessionStorage.getItem('id')
      })
    }
    return this.http.get(this.api.url + `count`, header);
  }

}
