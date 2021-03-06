import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'https://api.genshin.dev/characters';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private handleError<T>(operation ='operation', result?: T){
    return ( error: any ): Observable<T> => {
      console.error(error);

      this.log( `${operation} failed: ${error.message}` );

      return of ( result as T );
    }
  }

  getHeroes(): Observable<String[]>{
    return this.http.get<String[]>( this.heroesUrl )
    .pipe(
      tap( _ => this.log( 'fetched heroes' ) ),
      catchError( this.handleError<String[]>( 'getHeroes', [] ) )
    );
  }

  getHero(name: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${name}`;

    return this.http.get<Hero>( url ).pipe(
      tap( _ => this.log( `fetched hero name=${name}` ) ),
      catchError( this.handleError<Hero>( `getHero name=${name}` ) )
    )
  }

  searchHeroes(term: string): Observable<String[]> {
    if ( !term.trim() )  {
      return of( [] );
    }

    term = term.toLowerCase();

    var results: String[] = [];
    this.getHeroes().subscribe( result => {
      for ( var i = 0; i < result.length; i++ ){
        if ( result[i].includes( term ) ){
          results.push( result[i] );
        }
      }
      console.log( results );
    });

    return of(results);


    // return this.http.get<Hero[]>( `${this.heroesUrl}/?name=${term}` ).pipe(
    //   tap(x => x.length ?
    //     this.log( `found heroes matching "${term}"` ) :
    //     this.log( `no heroes matching "${term}"` ) ),
    //   catchError(
    //     this.handleError<Hero[]>( 'searchHeroes', [] ) )
    // );
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

}
