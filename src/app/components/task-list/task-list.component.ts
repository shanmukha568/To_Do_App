import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllTasks } from 'src/app/store/selectors/task.selectors';
import { loadTasks, updateTask, deleteTask } from 'src/app/store/actions/task.actions';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);
  pagedTasks: Task[] = [];
  pageSize = 5;
  pageIndex = 0;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTasks());
    this.tasks$.subscribe(tasks => this.updatePage(tasks));
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tasks$.subscribe(tasks => this.updatePage(tasks));
  }

  updatePage(tasks: Task[]) {
    this.pagedTasks = tasks.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  toggleCompletion(task: Task) {
    this.store.dispatch(updateTask({ id: task.id!, changes: { completed: !task.completed } }));
  }

  deleteTask(id: string) {
    this.store.dispatch(deleteTask({ id }));
  }

}
