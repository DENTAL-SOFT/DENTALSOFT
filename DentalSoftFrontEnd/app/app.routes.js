"use strict";
var router_1 = require('@angular/router');
/**IMPORTS HEROES */
var heroes_routes_1 = require('./heroes/heroes.routes');
var dashboard_component_1 = require('./dashboard/dashboard.component');
/**IMPORTS DENTAL-SOFT */
//import { AppDentalSoftComponent } from './app.component';
exports.routes = [
    { path: '', component: dashboard_component_1.DashboardComponent },
    //INDEX, deafault
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent }
].concat(heroes_routes_1.HeroesRoutes);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map