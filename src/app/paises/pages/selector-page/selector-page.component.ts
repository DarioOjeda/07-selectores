import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from "rxjs/operators";

import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region  : ["", Validators.required],
    pais    : ["", Validators.required],
    frontera: ["", Validators.required]
  });

  //llenar selectores 
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  // fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  //UI
  cargando: boolean = false;


  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;


    //cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges.
    //       subscribe( region => {
    //         console.log(region)

    //         this.paisesService.getPaisesPorRegion( region )
    //                 .subscribe( paises => {
    //                   console.log(paises);
    //                   this.paises = paises;
    //                 })
    //       })

    this.miFormulario.get('region')?.valueChanges
          .pipe(
            tap( (_) => {
              this.miFormulario.get('pais')?.reset('');
              //esto también resetea la frontera, pues activa, a su vez, el
              //el valueChanges de pais del formulario
              this.cargando = true;
            }),
            switchMap( region => this.paisesService.getPaisesPorRegion( region ))
          )
          .subscribe( paises => {
            this.cargando = false;
            this.paises = paises;      
          });

    this.miFormulario.get('pais')?.valueChanges
          .pipe(
            tap( (_) => {
              this.cargando = true;
              this.miFormulario.get('frontera')?.reset('');
            }), 
            switchMap( codigo => this.paisesService.getPaisPorAlpha(codigo)),
            switchMap( pais => {
                if(pais?.borders.length === 0){
                  this.cargando = false;
                }
                return this.paisesService.getPaisesPorBorders( pais?.borders! );
              })
          ).subscribe( paises => {
            console.log(paises);
            this.cargando = false;
            this.fronteras = paises;
            // this.fronteras = pais?.borders || [];
          });

  }

  

  guardar() {
    console.log(this.miFormulario);
  }
}
