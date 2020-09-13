import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { ListTaskComponent } from './tasks/list-task/list-task.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'task/create', component: CreateTaskComponent },
      { path: 'task/list', component: ListTaskComponent },
      { path: 'task/edit/:id', component: EditTaskComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
