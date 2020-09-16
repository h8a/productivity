import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/task.interface';
import { TaskModel } from '../models/task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseUrl = environment.baseUrl;
  public timer = 0;
  public descriptionTask = '';
  public taskId: string;
  public tasks: TaskModel[] = [];

  constructor( private http: HttpClient ) { }

  createTask( task: Task ) {
    return this.http.post(`${ this.baseUrl }/task`, task);
  }

  getTaskType() {
    return this.http.get(`${ this.baseUrl }/task/type`);
  }

  getTasks() {
    return this.http.get(`${ this.baseUrl }/task`);
  }

  getTask( id: number ) {
    return this.http.get(`${ this.baseUrl }/task/${ id }`);
  }

  editTask( task: Task ) {
    return this.http.put(`${ this.baseUrl }/task/update/${ task.id }`, task);
  }

  deleteTask( id: string ) {
    return this.http.delete(`${ this.baseUrl }/task/delete/${ id }`);
  }
}
