import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisSmall } from '../interfaces/paises.interface';

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

}
