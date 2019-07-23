import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<Hero[]> {
    // this.messageService.add("HeroService: fetch heroes");
    // return of(HEROES);
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>("getHeroes", [])));
  }
  getHero(id: number): Observable<Hero> {
    // TODO: send the message_after_fetching the hero
    this.messageService.add(`HeroService: fetch hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesUrl = "api/heroes";
  private handleError<T> (operation = 'operation', result?: T){
  return (error: any): Observable<T> => {
    console.error(error);
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };  
  }
}
