import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../heroes/hero';

import { HeroService } from '../heroes/hero.service';
import { Logger } from '../util/logger.service';

@Component({
  selector: 'dashboard',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls: ['app/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {

 heroes: Hero[] = [];

 constructor( private router: Router,
              private heroService: HeroService,
              private logger : Logger) { }

  ngOnInit() {
    this.logger.log('entro a dashboard');
    this.getHeroes();
  }

  getHeroes(){
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    let link = ['/hero', hero.id ];
    this.router.navigate(link);
  }
}