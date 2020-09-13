import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styles: [
  ]
})
export class CreateTaskComponent implements OnInit {

  public taskForm: FormGroup;
  public optionsTask: any;

  constructor( private tasksService: TasksService,
               private fb: FormBuilder,
               private router: Router ) {
               }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      description:      ['', [Validators.required, Validators.minLength(1)]],
      duration:         [0],
      optionalMinutes:  [0, Validators.max(120) ],
      optionalSeconds:  [0, Validators.max(60) ],
    }, {
      validators: this.validateCustomDurationTask('optionalMinutes', 'optionalSeconds')
    });

    this.getTaskType();
  }

  createTask() {
    if ( this.taskForm.invalid ) { return; }

    this.tasksService.createTask(this.taskForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/task/list');
      });

  }

  getTaskType() {
    this.tasksService.getTaskType()
      .subscribe((resp: any) => {
        console.log(resp);
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
