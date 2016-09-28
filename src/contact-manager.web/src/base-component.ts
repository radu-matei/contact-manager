import { inject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { ConnectionMessages } from './utils';

@inject(EventAggregator, ConnectionMessages)
export class BaseComponent {

    protected eventAggregator: EventAggregator;

    protected handlerMap: { [s: string]: Function; } = {};
    protected subscriberMap: { [s: string]: Subscription; } = {};
    protected hubChannelMap: { [s: string]: string; } = {};

    protected connectionMessages: ConnectionMessages;

    constructor(eventAggregator: EventAggregator, connectionMessages: ConnectionMessages) {
        this.eventAggregator = eventAggregator;
        this.connectionMessages = connectionMessages;

        this.getHandlers();
        this.getHubs();
    }


    attached(): void {
        this.handleConnectionEvents();
    }

    protected handleConnectionEvents(): void {
        for (var method in this.handlerMap)
            this.subscriberMap[method] = this.eventAggregator.subscribe(this.getChannelName(method), this.handlerMap[method].bind(this));

        for (var hubChannel in this.hubChannelMap)
            this.eventAggregator.publish(hubChannel, this.connectionMessages.subscribe);
    }

    detached(): void {
        this.handleDisconnectionEvents();
    }

    protected handleDisconnectionEvents(): void {
        for (var hubChannel in this.hubChannelMap)
            this.eventAggregator.publish(hubChannel, this.connectionMessages.unsubscribe);

        for (var method in this.subscriberMap)
            this.subscriberMap[method].dispose();
    }

    private getHandlers(): void {
        for (var method in this)
            if (method.endsWith("Handler"))
                this.handlerMap[method] = this[method];
    }

    private getHubs(): void {
        for (var method in this.handlerMap)
            this.hubChannelMap[this.getHubName(method)] = this.getHubName(method);
    }

    private getChannelName(methodName: string): string {
        return this.getHubName(methodName) + "-" + this.getHandlerName(methodName);
    }

    private getHubName(methodName: string): string {
        return methodName.substring(0, methodName.indexOf("_")) + "Hub";
    }

    private getHandlerName(methodName: string): string {
        return methodName.substring(methodName.indexOf("_") + 1).replace("Handler", "");
    }
}