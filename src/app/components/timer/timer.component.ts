import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, PartialObserver, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styles: [
  ]
})
export class TimerComponent implements OnInit, OnDestroy {

  public progressTimer = 0;
  public progress: string;
  private isRunning = true;
  private isComplete = false;
  public description = '';
  private baseTime: number;
  private task: TaskModel;

  timer$: Observable<number>;
  timerObserver: PartialObserver<number>;

  stopClick$ = new Subject();
  pauseClick$ = new Subject();

  constructor( private tasksService: TasksService ) {
    this.getTask();
  }

  ngOnInit(): void {

    this.getProgress();
  }

  ngOnDestroy(): void {
  }

  playClick() {

    if (!this.task) {
      this.getTask();
    }

    this.timer$ = interval(1000)
      .pipe(
        takeUntil(this.pauseClick$),
        takeUntil(this.stopClick$),
      );

    this.timerObserver = {
      next: (_: number) => {
        if(this.progressTimer > 0) {
          this.progressTimer -= 1;
          this.getProgress();
        } else {
          this.stopClick$.next();
          this.isRunning = false;
          this.isComplete = true;
        }
      }
    };

    this.isRunning = true;
    this.timer$.subscribe(this.timerObserver);

  }

  pauseClick() {
    this.pauseClick$.next();
    this.isRunning = false;
    this.baseTime = this.tasksService.timer - this.progressTimer;
  }

  restartClick() {

    this.getTask();
    this.baseTime = this.tasksService.timer;
  }

  getTask() {
    this.progressTimer = this.tasksService.timer;
    this.baseTime = this.tasksService.timer;
    this.description = this.tasksService.descriptionTask;
    if (this.tasksService.taskId) {
      this.tasksService.getTask(Number(this.tasksService.taskId))
      .subscribe((resp: any) => {
        this.task = resp.task;
      });
    }
  }

  stopClick() {
    this.progressTimer = this.tasksService.timer;
    this.getProgress();
    this.stopClick$.next();
    this.isRunning = false;
  }

  getProgress() {

    const hours = Math.floor(this.progressTimer / 3600);
    const minutes = Math.floor((this.progressTimer % 3600) / 60 );

    this.progress = `${ ('00' + hours).slice(-2) }:${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(this.progressTimer - minutes * 60)).slice(-2) }`;
  }
}
