import { Injectable } from '@angular/core';
import { Riego } from '../model/Riego';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiegoService {
 urlApi="http://localhost:8000";
  
  constructor(private _http: HttpClient ) {
   }
 

   getRiegoByIdElectrovalvula(id):Promise<Riego>{     
    return this._http.get(this.urlApi+"/api/riego/"+id).toPromise().then((riego:Riego)=>{
      return riego;
    });
  };

  getRiegosByIdElectrovalvula(id):Promise<Riego[]>{     
    return this._http.get(this.urlApi+"/api/riego/"+id+"/todos").toPromise().then((riego:Riego[])=>{
      return riego;
    });
  };

  agregarRiegoLog(riego:Riego){
    //console.log("entro al servicio");
    return this._http.post(this.urlApi+"/api/riego/agregar",{apertura:riego.apertura,fecha:riego.fecha,electrovalvulaId:riego.electrovalvulaId}).toPromise().then((result)=>{
      return result;
    });
  }
  
}
