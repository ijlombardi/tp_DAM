import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DispositivoPageRoutingModule } from './dispositivo-routing.module';

import { DispositivoPage } from './dispositivo.page';

import { ToggleButtonComponent } from './toggle-button.component';

import { ValvulaPipePipe } from './valvula-pipe.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoPageRoutingModule
  ],
  declarations: [DispositivoPage,ToggleButtonComponent,ValvulaPipePipe],
  providers: [ValvulaPipePipe]
})
export class DispositivoPageModule {}
