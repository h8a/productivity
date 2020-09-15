import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ListTaskComponent } from './tasks/list-task/list-task.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { SharedModuleModule } from '../shared/shared-module.module';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    CreateTaskComponent,
    ListTaskComponent,
    EditTaskComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModuleModule,
    PipesModule,
  ]
})
export class PagesModuleModule { }
