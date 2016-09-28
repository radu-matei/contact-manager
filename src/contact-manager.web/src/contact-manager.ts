import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class ContactManager {
  httpClient: HttpClient;
  message = 'Hello World!';


  constructor(httpClient: HttpClient){
      this.httpClient = httpClient;

      
  }

  public getContacts() {
    return this.httpClient.fetch('http://localhost:5000/api/Contacts/GetContacts')
      .then(response => response.json())
  }
}
