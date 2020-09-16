import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimerComponent } from './timer/timer.component';
import { BarsComponent } from './bars/bars.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    TimerComponent,
    BarsComponent,
  ],
  exports: [
    TimerComponent,
    BarsComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
  ]
})
export class ComponentsModule { }
