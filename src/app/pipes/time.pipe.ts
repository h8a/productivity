import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(task: TaskModel, type: 'minutes'|'seconds'): string {

    if (type === 'minutes') {
      if ( task.duration === 0 ) {

        const totalTime = (task.optionalMinutes * 60) + task.optionalSeconds;

        const minutes = Math.floor( totalTime / 60 );
        return `${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(totalTime - minutes * 60)).slice(-2) }`;
      } else {
        return `${ ('00' + task.duration).slice(-2) }:00`;
      }
    } else if (type === 'seconds') {
      const minutes = Math.floor( task.status_time / 60 );
      return `${ ('00' + minutes).slice(-2) }:${ ('00' + Math.floor(task.status_time - minutes * 60)).slice(-2) }`;
    } else {
      return 'invalid format';
    }
  }

}
