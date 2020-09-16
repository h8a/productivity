import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(task: TaskModel, type: 'minutes'|'seconds'): string {

    if (type === 'minutes') {
      if ( task.duration === 0 ) {
        const totalTime = (task.optionalMinutes * 60)  + task.optionalSeconds;

        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        return `${ ('00' + hours).slice(-2) }:${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(totalTime - minutes * 60)).slice(-2) }`;
        // const minutes = Math.floor( totalTime / 60 );
        // return `${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(totalTime - minutes * 60)).slice(-2) }`;
      } else {
        const totalTime = task.duration * 60;
        const hours = Math.floor(totalTime / 3600);
        const minutes = Math.floor((totalTime % 3600) / 60);
        return `${ ('00' + hours).slice(-2) }:${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(totalTime - minutes * 60)).slice(-2) }`;
      }
    } else if (type === 'seconds') {
      const hours = Math.floor(task.status_time / 3600);
      const minutes = Math.floor((task.status_time % 3600) / 60);
      return `${ ('00' + hours).slice(-2) }:${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(task.status_time - minutes * 60)).slice(-2) }`;
      // const minutes = Math.floor( task.status_time / 60 );
      // return `${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(task.status_time - minutes * 60)).slice(-2) }`;
    } else {
      return 'invalid format';
    }
  }

}
