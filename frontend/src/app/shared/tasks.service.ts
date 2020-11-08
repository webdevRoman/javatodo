import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { Task } from './../task';
import { TaskDb } from './../taskDb';

const apiUrl = 'http://localhost:8080/api/'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public tasksSubj: BehaviorSubject<Task[]> = new BehaviorSubject([])
  private tasks: Task[] = []
  public shownTasksSubj: BehaviorSubject<Task[]> = new BehaviorSubject([])
  private filterValue: string = ''

  constructor(private http: HttpClient) { }

  getTasks(): void {
    this.http.get(`${apiUrl}task`).subscribe(data => {
      (<Array<any>>data).forEach(t => {
        const task = new Task(t.id, t.description, t.done, false)
        this.tasks.push(task)
      })
      this.tasks.sort((a, b) => a.id - b.id)
      this.tasksSubj.next(this.tasks)
    }, error => console.log(error))
  }
  addTask(task: TaskDb): void {
    this.http.post<TaskDb>(`${apiUrl}task`, task, httpOptions).subscribe((resp) => {
      this.tasks.push(new Task(resp.id, resp.description, resp.done, false))
      this.tasksSubj.next(this.tasks)
    })
  }
  updateTask(task: Task): void {
    this.http.put<TaskDb>(`${apiUrl}task/${task.id}`, task, httpOptions).subscribe((resp) => {
      const currentTask = this.tasks.find(t => t.id === task.id)
      if (currentTask.isDone !== resp.done)
        currentTask.isDone = resp.done
      if (currentTask.description !== resp.description)
        currentTask.description = resp.description
      this.tasksSubj.next(this.tasks)
    })
  }
  deleteTask(id: number): void {
    this.http.delete<boolean>(`${apiUrl}task/${id}`).subscribe((resp) => {
      this.tasks.splice(this.tasks.findIndex(t => t.id === id), 1)
      this.tasksSubj.next(this.tasks)
    })
  }
  checkAll(check: boolean): void {
    if (check)
      this.http.put<any>(`${apiUrl}task/check`, null).subscribe((resp) => {
        this.tasks.forEach(t => t.isDone = true)
        this.tasksSubj.next(this.tasks)
      })
    else
      this.http.put<any>(`${apiUrl}task/uncheck`, null).subscribe((resp) => {
        this.tasks.forEach(t => t.isDone = false)
        this.tasksSubj.next(this.tasks)
      })
  }
  deleteChecked(): void {
    this.http.delete<boolean>(`${apiUrl}task/checked`).subscribe(() => {
      this.tasks = [...this.tasks.filter(t => !t.isDone)]
      this.tasksSubj.next(this.tasks)
      this.changeFilter(this.filterValue)
    })
  }

  changeFilter(filterValue: string) {
    this.filterValue = filterValue
    switch (filterValue) {
      case 'Active':
        this.shownTasksSubj.next(this.tasks.filter(t => !t.isDone))
        break;
      case 'Completed':
        this.shownTasksSubj.next(this.tasks.filter(t => t.isDone))
        break;
      default:
        this.shownTasksSubj.next(this.tasks)
        break;
    }
  }
}