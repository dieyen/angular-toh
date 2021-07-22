import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: String[] = [];

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getRandom(arr: String[], n: number){
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);

    if ( n > len ){
      throw new RangeError(" getRandom: More elements taken than available.")
    }

    while ( n-- ){
      var x = Math.floor( Math.random() * len );
      result[n] = arr[x in taken? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe( heroes => { 
        this.heroes = this.getRandom( heroes, 5 );
      });
  }

}
