import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimerStatusComponent } from './timer-status/timer-status.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    TimerStatusComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    TimerStatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
  ]
})
export class SharedModuleModule { }
