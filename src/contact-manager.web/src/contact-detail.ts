import { inject } from 'aurelia-framework';
import { ContactManager } from './contact-manager';
import { Contact } from './interfaces';
import { SignalRConnection } from './signalr-component';

@inject(ContactManager, SignalRConnection)
export class ContactDetail {

  routeConfig;
  contactManager: ContactManager;
  contact: Contact;
  originalContact: Contact;

  signalRConnection: SignalRConnection;

  constructor(contactManager: ContactManager, signalRConnection: SignalRConnection) {
    this.contactManager = contactManager;
    this.signalRConnection = signalRConnection;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.contactManager.getContactById(params.id).then((c: Contact) => {
      this.contact = c;
      this.originalContact = JSON.parse(JSON.stringify(this.contact));
      
      this.routeConfig.navModel.setTitle(this.contact.firstName);
    });
  }

  attached() {
    this.signalRConnection.tst();
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
}