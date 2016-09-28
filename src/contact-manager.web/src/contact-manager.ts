import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Contact } from './interfaces';

@inject(HttpClient)
export class ContactManager {
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    public getContacts() {
        return this.httpClient.fetch('http://localhost:5000/api/Contacts/GetContacts')
            .then(response => response.json())
    }

    public getContactById(id: number) {
        let path = 'http://localhost:5000/api/Contacts/GetContactById?id=' + id;

        return this.httpClient.fetch(path)
            .then(response => response.json())
    }

    public updateContact(contact: Contact) {

        this.httpClient.fetch('http://localhost:5000/api/Contacts/UpdateContact', {
            method: 'post',
            body: json(contact)
        });
    }
}
