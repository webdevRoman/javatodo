import { Component, OnInit } from '@angular/core';

import { TaskDb } from './taskDb';
import { Task } from './task';
import { TasksService } from './shared/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTaskDescr: string = '';
  allChecked = false;
  allUnchecked = false;
  checkBtnValue = '';
  tasksLeftNumber = 0;
  filters = ['All', 'Active', 'Completed'];
  filterValue = this.filters[0];
  activeTasks = [];
  completedTasks = [];
  shownTasks = [];

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.tasksSubj.subscribe((data) => {
      this.tasks = data;
      this.activeTasks = this.tasks.filter((t) => !t.isDone);
      this.tasksLeftNumber = this.activeTasks.length;
      this.completedTasks = this.tasks.filter((t) => t.isDone);
      if (this.activeTasks.length === this.tasks.length)
        this.allUnchecked = true;
      else this.allUnchecked = false;
      if (this.completedTasks.length === this.tasks.length) {
        this.allChecked = true;
        this.checkBtnValue = 'Uncheck all';
      } else {
        this.allChecked = false;
        this.checkBtnValue = 'Check all';
      }
    });
    this.tasksService.getTasks();
    this.tasksService.shownTasksSubj.subscribe((data) => {
      this.shownTasks = data;
    });
    this.tasksService.changeFilter('All');
  }

  addTask() {
    if (this.newTaskDescr !== '') {
      const newTask = new TaskDb(null, this.newTaskDescr, false);
      this.newTaskDescr = '';
      this.tasksService.addTask(newTask);
    }
  }

  checkAll() {
    if (this.allChecked) {
      this.tasksService.checkAll(false);
      this.checkBtnValue = 'Check all';
    } else {
      this.tasksService.checkAll(true);
      this.checkBtnValue = 'Uncheck all';
    }
  }
  changeFilter() {
    this.tasksService.changeFilter(this.filterValue);
  }
  deleteChecked() {
    this.tasksService.deleteChecked();
  }
}
