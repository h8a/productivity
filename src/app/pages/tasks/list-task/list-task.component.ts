import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { TasksService } from '../../../services/tasks.service';
import { TaskModel } from '../../../models/task.model';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styles: [
  ]
})
export class ListTaskComponent implements OnInit {

  public tasks: TaskModel[] = [];

  constructor( private tasksService: TasksService,
               private router: Router ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks()
      .subscribe((resp: any) => {
        this.tasks = resp.tasks;
      });
  }

  deleteTask( task: TaskModel ) {
    console.log(task);
    Swal.fire({
      title: 'Eliminar tarea',
      text: `¿ Eliminar tarea: ${ task.description } duracion: ${ task.optionalMinutes }:${ task.optionalSeconds } ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then(( result ) => {
      if (result.isConfirmed) {

        this.tasksService.deleteTask( task.id )
          .subscribe((resp: any) => {
            this.tasks = resp.tasks;
            Swal.fire(
              'Tarea eliminada!',
              'La tarea seleccionada ha sido eliminada',
              'success'
            );
          }, (err) => {
            Swal.fire(
              'Error al eliminar tarea!',
              'Vuelva a intentarlo o contacte con el administrador',
              'error'
            );
          });
      }
    });
  }

  editTask( id: string ) {
    this.router.navigateByUrl(`/task/edit/${ id }`);
  }

  playClick( task: TaskModel ) {
    if (task.optionalMinutes !== 0) {

      if ( task.optionalSeconds > 0  && task.optionalMinutes > 0) {
        this.tasksService.timer = (task.optionalMinutes * 60) + task.optionalSeconds;
      } else if ( task.optionalMinutes > 0 && task.optionalSeconds === 0 ) {
        this.tasksService.timer = task.optionalMinutes * 60;
      } else if ( task.optionalMinutes === 0 && task.optionalSeconds > 0 ) {
        this.tasksService.timer = task.optionalSeconds;
      }

    } else {
      this.tasksService.timer = task.duration * 60;
    }

    this.tasksService.descriptionTask = task.description;

    this.tasks = [task, ...this.tasks.filter(item => item.id !== task.id)];
  }
}
