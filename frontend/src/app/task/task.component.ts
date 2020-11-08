import { Component, Input } from '@angular/core';

import { Task } from './../task';
import { TasksService } from './../shared/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.styl'],
})
export class TaskComponent {
  @Input() task: Task;

  description = 'task 1 description';
  isChecked = false;

  constructor(private tasksService: TasksService) {}

  changeChecked() {
    this.tasksService.updateTask(this.task);
  }
  toggleEdit() {
    if (!this.task.editing) {
      this.task.editing = true;
    } else {
      this.task.editing = false;
      this.tasksService.updateTask(this.task);
    }
  }
  deleteTask() {
    this.tasksService.deleteTask(this.task.id);
  }
}
