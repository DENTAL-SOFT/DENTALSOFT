import { Component, Input, OnInit, OnDestroy, EventEmitter, Output  } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-hero-detail',
  template: `
            <div *ngIf="hero">
                <h2>{{hero.name}} details!</h2>
                <div>
                    <label>id: </label>{{hero.id}}
                </div>
                <div>
                    <label>name: </label>
                    <input [(ngModel)]="hero.name" placeholder="name"/>
                </div>
                <button (click)="goBack()">Back</button>
                <button (click)="save()">Save</button>
            </div>
            `,
    styleUrls: ['app/heroes/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit, OnDestroy {

    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;
    navigated = false; //true if navigated here
    private sub: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private heroService: HeroService) {}

    ngOnInit() {
        let id: any;
        this.sub = this.route.params.subscribe(params => id = +params['id']);
        if (id !== null && !isNaN(id)) {
            this.navigated = true;
            this.getHeroes(id);
        } else {
            this.navigated = false;
            this.hero = new Hero(0, '');
        }

        /**this.sub = this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.getHeroes(id);
        }); */
    }

    save() {
    this.heroService.save(this.hero).then(hero => {
            this.hero = hero; // saved hero, w/ id if new
            this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if (this.navigated) { window.history.back(); }
    }

    ngOnDestroy() {
         this.sub.unsubscribe();
    }

    getHeroes(id: number) {
	    this.heroService.getHero(id).then(hero => this.hero = hero);
    }

}