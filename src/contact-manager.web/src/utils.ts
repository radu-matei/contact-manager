export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface ContactsClient {
    firstNameChanged(firstName: string): void;
}

export interface ContactsProxy {
    client: ContactsClient;
}

export interface SignalR {
    contactsHub: ContactsProxy;
}


export interface JQuery {
    connection: any;
}

export class ConnectionMessages {
    subscribe: string = "subscribe";
    unsubscribe: string = "unsubscribe";
};