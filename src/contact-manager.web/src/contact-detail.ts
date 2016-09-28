import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactManager } from './contact-manager';
import { Contact } from './utils';
import { BaseComponent } from './base-component';
import { ConnectionMessages } from './utils';

@inject(ContactManager, EventAggregator, ConnectionMessages)
export class ContactDetail extends BaseComponent {

  routeConfig;
  contactManager: ContactManager;
  contact: Contact;
  originalContact: Contact;

  nonBindingFirstName: string;

  constructor(contactManager: ContactManager, eventAggregator: EventAggregator, connectionMessages: ConnectionMessages) {
    super(eventAggregator, connectionMessages);

    this.contactManager = contactManager;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.contactManager.getContactById(params.id).then((c: Contact) => {
      this.contact = c;
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
      this.nonBindingFirstName = this.originalContact.firstName;

      this.routeConfig.navModel.setTitle(this.contact.firstName);
    });
  }

  get canSave(): boolean {
    return this.originalContact.firstName != this.contact.firstName ||
      this.originalContact.lastName != this.contact.lastName ||
      this.originalContact.email != this.contact.email ||
      this.originalContact.phoneNumber != this.contact.phoneNumber;
  }


  save(): void {
    this.contactManager.updateContact(this.contact);
  }

  contacts_contactUpdatedHandler(contact: Contact): void {
      this.nonBindingFirstName = contact.firstName;
      this.contact = contact;
  }
}