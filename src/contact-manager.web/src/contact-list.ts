import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {ContactManager} from './contact-manager';
import {Contact} from './interfaces';

@inject(ContactManager)
export class ContactList {

  contactManager: ContactManager;
  contacts: Array<Contact>;
  selectedId: number;

  constructor(contactManager: ContactManager){
      this.contactManager = contactManager;
  }

  created(): void {
      this.contactManager.getContacts().then(contacts => this.contacts = contacts);
  }

  select(contact): boolean{
    this.selectedId = contact.id;
    return true;
  }
}
