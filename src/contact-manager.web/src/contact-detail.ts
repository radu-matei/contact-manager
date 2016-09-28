import { inject } from 'aurelia-framework';
import { ContactManager } from './contact-manager';
import { Contact } from './interfaces';

@inject(ContactManager)
export class ContactDetail {

  routeConfig;
  contactManager: ContactManager;
  contact: Contact;

  constructor(contactManager: ContactManager) {
    this.contactManager = contactManager;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.contactManager.getContactById(params.id).then((contact: Contact) => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(this.contact.firstName);
    });
  }

}