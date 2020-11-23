import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public url = 'http://localhost:3333/'
  // public url = 'https://86ae0f8648b9.ngrok.io/'

  constructor() { }
}


