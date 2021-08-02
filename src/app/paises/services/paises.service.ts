import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl: string = "https://restcountries.eu/rest/v2";
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[] {
    return [ ...this._regiones ];
    // Nuevo arreglo desestructurado
  }

  constructor( private http: HttpClient ) { }

  getPaisesPorRegion( region: string ): Observable<PaisSmall[]>{

    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code;namehttps://restcountries.eu/rest/v2/region/americas?fields=alpha3Code;name`
    return this.http.get<PaisSmall[]>( url );

  }

  getPaisPorAlpha( codigo: string): Observable<Pais | null>{

    if(!codigo) {
      return of(null);
    }
     
    const url = `${this._baseUrl}/alpha/${ codigo }`;
    return this.http.get<Pais>( url );
  
  }

  getPaisPorAlphaSmall( codigo: string): Observable<PaisSmall>{
    
    const url = `${this._baseUrl}/alpha/${ codigo }?fields=alpha3Code;name`;
    return this.http.get<PaisSmall>( url );
  }

  getPaisesPorBorders( borders: string[] ): Observable<PaisSmall[]>{
    
    //si el pais no tiene fronteras
    if( !borders ) {
      return of([]);
    }

    //Arreglo de peticiones, cada una de las cuales obtiene un paisSmall
    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach( codigo => {
      const peticion = this.getPaisPorAlphaSmall( codigo );
      peticiones.push( peticion );
    });

    //rxjs permite disparar todas esas peticiones de manera simultánea

    return combineLatest( peticiones );

  }

}
