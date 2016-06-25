import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { Logger } from './util/logger.service';

import { APP_ROUTER_PROVIDERS } from './app.routes';
import { HTTP_PROVIDERS } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './heroes/in-memory-data.service';

bootstrap(  AppComponent,
            
            [ APP_ROUTER_PROVIDERS, 
              HTTP_PROVIDERS, 
              { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
              { provide: SEED_DATA, useClass: InMemoryDataService },      // in-mem server data
              Logger
            ] ).catch(err => console.error(err));