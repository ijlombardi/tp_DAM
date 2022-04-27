import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../model/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { Medicion } from '../model/Medicion';
import { MedicionService } from '../services/medicion.service';
import { Riego } from '../model/Riego';
import { RiegoService } from '../services/riego.service';

//import { ValvulaPipePipe } from '../dispositivo/valvula-pipe.pipe';


import * as Highcharts from 'highcharts';
import { ToggleButtonComponent } from './toggle-button.component';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  unDispositivo:Array<Dispositivo> = new Array<Dispositivo>();
  todasMediciones:Array<Medicion> = new Array<Medicion>();
  todosRiegos:Array<Riego> = new Array<Riego>();

  public togle_mediciones:boolean= false;
  public togle_riegos:boolean= false;

  private valorObtenido:number=0;
  public myChart;
  private chartOptions;

  constructor(private router:ActivatedRoute,
            private dispositivoServ:DispositivoService,
            private medicionServ:MedicionService,
            private riegoServ:RiegoService
            ) {}

  ngOnInit() {
    //this.generarChart();
    //this.llamoService();
    //this.llamoServiceMedicion();
    //console.log(this.dispositivo);
  }

  ionViewWillEnter(){
    this.generarChart();
    this.llamoService();
    this.llamoServiceMedicion();
  }

  ionViewWillLeave(){
    //this.generarChart();
    //this.llamoServiceMedicion();
    this.valorObtenido = 0;
    this.myChart=0;
  }

  async llamoService(){
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    //this.dispositivo = this.dServ.getDispositivo(idDispositivo);
    let valor2 = await this.dispositivoServ.getDispositivo(idDispositivo);
    //this.unDispositivo = valor2;
    //console.log(this.unDispositivo);  
  }

  async llamoServiceMedicion(){
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    let ultimaMedicion:Medicion = await this.medicionServ.getMedicionByIdDispositivo(idDispositivo);
    this.valorObtenido = parseInt(ultimaMedicion.valor.toString());
    //console.log(this.valorObtenido);

    this.generarChart();
    //actualizo el chart
    this.myChart.update({series: [{
      name: 'kPA',
      data: [this.valorObtenido],
      tooltip: {
          valueSuffix: ' kPA'
      }
    }]});
}

  verMediciones(){

    if (this.togle_mediciones)
    {
      this.todasMediciones = [];
      this.togle_mediciones = false;
    }
    else
    {
      this.llamoServiceMediciones();
      this.llamoServiceMedicion();
      this.togle_mediciones = true;
    }
    
  }

  async llamoServiceMediciones(){
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    this.todasMediciones = await this.medicionServ.getMedicionesByIdDispositivo(idDispositivo);
    console.log("Mediciones mostradas");
  }

  verRiegos(){
    if (this.togle_riegos)
    {
      this.todosRiegos = [];
      this.togle_riegos = false;
    }
    else
    {
      this.llamoServiceRiegos();
      this.togle_riegos = true;
    }
  
  }

  async llamoServiceRiegos(){
    let idDispositivo = this.router.snapshot.paramMap.get('id');
    let miDispositivo:Dispositivo = await this.dispositivoServ.getDispositivo(idDispositivo);
    this.todosRiegos = await this.riegoServ.getRiegosByIdElectrovalvula(miDispositivo[0].electrovalvulaId);
  }
  
  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: ' '
        }

        ,credits:{enabled:false}
        
           
        ,pane: {
            startAngle: -150,
            endAngle: 150
        } 
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,
  
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',
  
        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'kPA'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,
  
    series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' kPA'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

}
