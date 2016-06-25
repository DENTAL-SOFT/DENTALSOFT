"use strict";
var heroes_component_1 = require('./heroes.component');
var hero_detail_component_1 = require('./hero-detail.component');
exports.HeroesRoutes = [
    { path: 'heroes', component: heroes_component_1.HeroesComponent },
    { path: 'hero/:id', component: hero_detail_component_1.HeroDetailComponent }
];
//# sourceMappingURL=heroes.routes.js.map