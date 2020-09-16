import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public pendingTasksList: TaskModel[] = [];
  public completeTasksList: TaskModel[] = [];

  constructor( private tasksService: TasksService ) { }

  ngOnInit(): void {
    this.pendingTasks();
    this.completeTasks();
  }

  pendingTasks() {
    this.tasksService.pendingTasks()
      .subscribe((resp: any) => {
        this.pendingTasksList = resp.tasks;
        console.log(resp);
      });
  }

  completeTasks() {
    this.tasksService.completeTasks()
      .subscribe((resp: any) => {
        this.completeTasksList = resp.tasks;
        console.log(resp);
      });
  }

}
