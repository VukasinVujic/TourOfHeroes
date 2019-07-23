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

  httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

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
    // this.messageService.add(`HeroService: fetch hero id=${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    
  }
  
  updateHero(hero: Hero):Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(tap(_=>this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero')));
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
