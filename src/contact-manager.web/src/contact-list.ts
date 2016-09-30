import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactManager } from './contact-manager';
import { Contact, ConnectionMessages } from './utils';
import { BaseComponent } from './base-component';

@inject(ContactManager, EventAggregator, ConnectionMessages)
export class ContactList extends BaseComponent {

  contactManager: ContactManager;
  contacts: Array<Contact>;
  selectedId: number;

  constructor(contactManager: ContactManager, eventAggregator: EventAggregator, connectionMessages: ConnectionMessages) {
    super(eventAggregator, connectionMessages);

    this.contactManager = contactManager;
  }

  attached(): void {
    super.attached();
    this.contactManager.getContacts().then(contacts => this.contacts = contacts);
  }

  select(contact): boolean {
    this.selectedId = contact.id;
    return true;
  }

  contacts_contactUpdatedHandler(contact: Contact): void {
     this.contacts.forEach(c => {
        if(c.id == contact.id)
          c.firstName = contact.firstName;
     });
  }
}
