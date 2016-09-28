import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {SignalRConnection} from './signalr-component';

@inject(SignalRConnection)
export class App {

  constructor(private signalRConnection: SignalRConnection){}

  router: Router;

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      {route: '',             moduleId: 'no-selection', title: 'Select'},
      {route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts'}
    ]);

    this.router = router;
  }

}
