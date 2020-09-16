import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styles: [
  ]
})
export class CreateTaskComponent implements OnInit {

  public taskForm: FormGroup;
  public optionsTask: any;
  private task: TaskModel;
  private to_play: number;

  constructor( private tasksService: TasksService,
               private fb: FormBuilder,
               private router: Router ) {
               }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      description:      ['', [Validators.required, Validators.minLength(1)]],
      duration:         [0, Validators.min(0)],
      optionalMinutes:  [0, [ Validators.max(120), Validators.min(0) ] ],
      optionalSeconds:  [0, [ Validators.max(59), Validators.min(0) ] ],
    }, {
      validators: this.validateCustomDurationTask('optionalMinutes', 'optionalSeconds')
    });

    this.getTaskType();
  }

  createTask() {

    console.log(this.taskForm);

    if ( this.taskForm.invalid ) { return; }

    if (!this.taskForm.controls.duration.errors) {
      this.to_play = this.taskForm.controls.duration.value * 60;
    } else {
      this.to_play = (this.taskForm.controls.optionalMinutes.value * 60) + this.taskForm.controls.optionalSeconds.value;
    }

    this.task = {
      status_time: 0,
      to_play: this.to_play,
      ...this.taskForm.value,
    };

    this.tasksService.createTask(this.task)
      .subscribe(resp => {
        this.router.navigateByUrl('/task/list');
      });

  }

  getTaskType() {
    this.tasksService.getTaskType()
      .subscribe((resp: any) => {
        this.optionsTask = resp.types;
      });
  }

  validateCustomDurationTask( duration1Name: string, duration2Name: string ) {
    return ( formGroup: FormGroup ) => {
      const duration1Control = formGroup.get(duration1Name);
      const duration2Control = formGroup.get(duration2Name);

      if ( Number(duration1Control) === 120 && Number(duration2Control) > 59 ) {
        duration2Control.setErrors({ errorDuration: true });
      } else {
        duration2Control.setErrors(null);
      }

    };
  }

}
