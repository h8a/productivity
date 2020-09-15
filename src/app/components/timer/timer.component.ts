import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, PartialObserver, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';

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

  timer$: Observable<number>;
  timerObserver: PartialObserver<number>;

  stopClick$ = new Subject();
  pauseClick$ = new Subject();

  constructor( private tasksService: TasksService ) {
    this.getTask();
  }

  ngOnInit(): void {
    this.getTask();

    this.getProgress();

    setTimeout(() => {
      if (!this.isRunning) {
        this.getProgress();
        console.log('entro');
      }
    }, 1000);
  }

  ngOnDestroy(): void {
  }

  playClick() {

    this.getTask();

    if (this.isRunning) {
      this.restartClick();
    }

    this.timer$ = interval(1000)
      .pipe(
        takeUntil(this.pauseClick$),
        takeUntil(this.stopClick$),
      );

    this.timerObserver = {
      next: (_: number) => {
        if(this.progressTimer < 121 && this.progressTimer > 0) {
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
  }

  restartClick() {

    this.getTask();
  }

  getTask() {
    this.progressTimer = this.tasksService.timer;
    this.description = this.tasksService.descriptionTask;
  }

  stopClick() {
    this.progressTimer = this.tasksService.timer;
    this.getProgress();
    this.stopClick$.next();
    this.isRunning = false;
  }

  getProgress() {
    this.progress = `${ this.progressTimer }`;
  }

}
