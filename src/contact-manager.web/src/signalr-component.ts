import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as $ from 'jquery';
import 'ms-signalr-client';
import { ConnectionMessages } from './utils';

@inject(EventAggregator, ConnectionMessages)
export class SignalRConnection {

    private channelName = "contactsHub";
    protected eventAggregator: EventAggregator;
    protected clientMethods: string[] = ["contactUpdated"];
    protected isConnected: boolean = false;
    protected hubProxy: any;
    protected connection: any;
    protected connectionMessages: ConnectionMessages;

    constructor(eventAggregator: EventAggregator, connectionMessages: ConnectionMessages) {
        this.eventAggregator = eventAggregator;
        this.connectionMessages = connectionMessages;

        this.configureConnection();
        this.subscribeToConnectionEvents();
    }

    protected configureConnection(): void {
        var url = "http://localhost:5000/signalr";

        this.connection = $.hubConnection(url);
        this.hubProxy = this.connection.createHubProxy('contactsHub');

    }

    protected subscribeToConnectionEvents(): void {
        this.eventAggregator.subscribe(this.channelName, (connectionMessage) => {
            if (connectionMessage == this.connectionMessages.subscribe)
                this.subscribe();
            else
                if (connectionMessage == this.connectionMessages.unsubscribe)
                    this.unsubscribe();
        });
    }

    protected configureClientMethods(): void {
        for (var method in this.clientMethods) {
            this.hubProxy.on(this.clientMethods[method], this.publishClientMethod(this.clientMethods[method]));
        }
    }

    private publishClientMethod(method: string): Function {
        return (object) => { this.eventAggregator.publish(this.getMethodChannel(method), object); };
    }

    private getMethodChannel(methodName: string): string {
        return this.channelName + "-" + methodName;
    }

    public subscribe(): void {
        this.configureClientMethods();

        if (this.isConnected == false) {
            this.connection.start({ jsonp: true })
                .done(function () { console.log('Now connected'); })
                .fail(function () { console.log('Could not connect'); });
        }
    }

    public unsubscribe(): void {
        $.connection.hub.stop();
    }
}