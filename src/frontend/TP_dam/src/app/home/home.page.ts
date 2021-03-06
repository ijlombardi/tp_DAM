import { Component } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listadoDispositivo:Dispositivo[];

  constructor(public dispositivoServ:DispositivoService)
  {
    this.llamoService();
  }

  async llamoService(){
    //console.log("Estoy en el llamoServicec y llame al service");
    let listado= await this.dispositivoServ.getListadoDispositivos();
    //let valor2= await this.dispositivoServ.getDispositivo(listado[0].dispositivoId);
    //console.log(valor2);
    this.listadoDispositivo=listado;
    //console.log(listado);
  }

} 
