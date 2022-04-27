import { not } from '@angular/compiler/src/output/output_ast';
import { Component, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service';
import { Riego } from '../model/Riego';
import { RiegoService } from '../services/riego.service';


@Component({
  selector: 'toggle-button',
  template: `
    
    <p>Valvula {{valvula ? 'abierta' : 'cerrada'}}</p>
    <input type="checkbox" id="toggle-button-checkbox"
      (change)="check_clickeado()" [checked]="valvula">
    <label class="toggle-button-switch"  
      for="toggle-button-checkbox"></label>
    <div class="toggle-button-text">
      <div class="toggle-button-text-on">ON</div>
      <div class="toggle-button-text-off">OFF</div>
    </div>
  `,
  styles: [`
  :host {
    display: block;
    position: relative;
    width: 120px;
    height: 100px;
  }
  
  input[type="checkbox"] {
    display: none; 
  }
  .toggle-button-switch {
    position: absolute;
    top: 30px;
    left: 0px;
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 100%;
    cursor: pointer;
    z-index: 0;
    transition: left 0.3s;
  }

  .toggle-button-text {
    overflow: hidden;
    background-color: #fc3164;
    border-radius: 25px;
    box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
    transition: background-color 0.3s;
  }

  .toggle-button-text-on,
  .toggle-button-text-off {
    float: left;
    width: 50%;
    height: 100%;
    line-height: 50px;
    font-family: Lato, sans-serif;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }

  input[type="checkbox"]:checked ~ .toggle-button-switch {
    left: 65px;
  }

  input[type="checkbox"]:checked ~ .toggle-button-text {
    background-color: #3dbf87;
  }
  `]
})
export class ToggleButtonComponent implements OnInit {
  @Output() changed = new EventEmitter<boolean>();

  valvula : boolean = false;

  dispositivoActual: number;
  electrovalvulaActual: number;
  nuevoLog: Riego;

  constructor(private router:ActivatedRoute,
    private dispositivoServ:DispositivoService,
    private medicionServ:MedicionService,
    private riegoServ:RiegoService) {}

  
  ngOnInit() {
    this.updateEstadoValvula();
  }
  
  async updateEstadoValvula(){
    //console.log("actualiza estado valvula");
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.dispositivoActual = parseInt(idDispositivo);
    let miDispositivo:Dispositivo = await this.dispositivoServ.getDispositivo(idDispositivo);
    let miRiego:Riego = await this.riegoServ.getRiegoByIdElectrovalvula(miDispositivo[0].electrovalvulaId);
    this.electrovalvulaActual = parseInt(miDispositivo[0].electrovalvulaId);
    //console.log(this.valvula);
    if (miRiego.apertura == 1)
    {
      this.valvula = true;
    }
    else
    {
      this.valvula = false;
    }
    //console.log(this.valvula);
  }

  async check_clickeado(){
    if (this.valvula)
    {
      //Envio log a 
      let miRiego:Riego = new Riego(1,new Date().toISOString().slice(0, 19).replace('T', ' ') ,0,this.electrovalvulaActual);
      //console.log(miRiego);
      await this.riegoServ.agregarRiegoLog(miRiego);

      // Si la valvula se cierra se toma una nueva medicion y se guarda en la BD.
      // se toma un valor aleatorio de 1-100 como ejempli
      let ranNumber: number = Math.floor((Math.random() * 100) + 1);
      let miMedicion:Medicion = new Medicion(1,new Date().toISOString().slice(0, 19).replace('T', ' ') ,ranNumber,this.dispositivoActual);
      await this.medicionServ.agregarMedicion(miMedicion);

      this.valvula = false;
    }
    else
    {
      let miRiego:Riego = new Riego(1,new Date().toISOString().slice(0, 19).replace('T', ' ') ,1,this.electrovalvulaActual);
      //console.log(miRiego);
      await this.riegoServ.agregarRiegoLog(miRiego);
      this.valvula = true;
    }

  }


}


