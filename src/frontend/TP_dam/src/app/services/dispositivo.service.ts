import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService
{
  /*
  listado:Array<Dispositivo> = new Array<Dispositivo>();
  
  constructor(private _http: HttpClient) {
    var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
    var disp2:Dispositivo= new Dispositivo(2,"Sensor 2","Cocina",2);
    var disp3:Dispositivo= new Dispositivo(3,"Sensor 3","Jardin Delantero",3);
    var disp4:Dispositivo= new Dispositivo(4,"Sensor 4","Living",4);
    this.listado.push(disp);
    this.listado.push(disp2);
    this.listado.push(disp3);
    this.listado.push(disp4);
   }

   getDispositivo(id):Dispositivo{
      return this.listado.filter(dispositivo=> dispositivo.dispositivoId==id)[0];
   }
  */   

 
   urlApi="http://localhost:8000";
   constructor(private _http: HttpClient ) {}

   getListadoDispositivos():Promise<Dispositivo[]>
   {
    return this._http.get(this.urlApi+ "/api/dispositivo/").toPromise().then((listado:Dispositivo[])=>
    {
      //console.log(listado); 
      return listado;
    });
  }

    
  getDispositivo(id):Promise<Dispositivo>
  {     
    return this._http.get(this.urlApi+"/api/dispositivo/"+id).toPromise().then((dispositivo:Dispositivo)=>
    {
      //console.log(dispositivo);
      //var disp:Dispositivo= new Dispositivo(1,"Sensor 1","Patio",1);
      //console.log(disp);
      return dispositivo;
    });
  };

  
}
