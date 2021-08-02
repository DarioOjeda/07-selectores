import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from "rxjs/operators";

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
    region: ["", Validators.required],
    pais: ["", Validators.required]
  });

  //llenar selectores 
  regiones: string[] = [];
  paises: PaisSmall[] = [];


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
            switchMap( region => this.paisesService.getPaisesPorRegion( region ))
          )
          .subscribe( paises => {
            this.paises = paises;      
          })
  }

  guardar() {
    console.log(this.miFormulario);
  }
}
