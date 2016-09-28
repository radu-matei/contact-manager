import { inject } from 'aurelia-framework';
import * as $ from 'jquery';
import 'ms-signalr-client';

export class SignalRConnection {

    constructor() {

    }

    tst() {
        var url = "http://localhost:5001/signalr";
        var connection = $.hubConnection(url);
        var contosoChatHubProxy = connection.createHubProxy('postsHub');
        contosoChatHubProxy.on('publishPost', function (message) {
            console.log(message.text);
        });

        $.connection.hub.logging = true;
        connection.start({jsonp:true})
            .done(function () { console.log('Now connected, connection ID=' + connection.id); })
            .fail(function () { console.log('Could not connect'); });
        }
    }