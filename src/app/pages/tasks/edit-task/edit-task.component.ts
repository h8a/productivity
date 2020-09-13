import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../../services/tasks.service';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styles: [
  ]
})
export class EditTaskComponent implements OnInit {

  public taskForm: FormGroup;
  public task: TaskModel;
  public optionsTask: any;
  public taskId: number;

  constructor( private tasksService: TasksService,
               private fb: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute ) {
               }

  ngOnInit(): void {

    this.taskId = this.activatedRoute.snapshot.params.id;

    this.taskForm = this.fb.group({
      description:      ['', [Validators.required, Validators.minLength(1)]],
      duration:         [0],
      optionalMinutes:  [0, Validators.max(120) ],
      optionalSeconds:  [0, Validators.max(60) ],
    }, {
      validators: this.validateCustomDurationTask('optionalMinutes', 'optionalSeconds')
    });

    this.getTaskType();

    this.getTask();
  }

  editTask() {
    if ( this.taskForm.invalid ) { return; }

    this.task = {
      id: this.task.id,
      ...this.taskForm.value
    };

    this.tasksService.editTask(this.task)
      .subscribe(resp => {
        this.router.navigateByUrl('/task/list');
      });

  }

  getTask() {
    this.tasksService.getTask(this.taskId)
      .subscribe((resp: any) => {
        this.task = resp.task;

        this.taskForm.get('description').setValue(this.task.description);
        this.taskForm.get('duration').setValue(this.task.duration);
        this.taskForm.get('optionalMinutes').setValue(this.task.optionalMinutes);
        this.taskForm.get('optionalSeconds').setValue(this.task.optionalSeconds);
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
