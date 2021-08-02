import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region: ["", Validators.required],
  });

  //llenar selectores 
  regiones: string[] = [];

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;


    //cuando cambie la region
    this.miFormulario.get('region')?.valueChanges.
          subscribe( region => {
            console.log(region)

            this.paisesService.getPaisesPorRegion( region )
                    .subscribe( paises => {
                      
                    })
          })
  }

  guardar() {
    console.log(this.miFormulario);
  }
}
