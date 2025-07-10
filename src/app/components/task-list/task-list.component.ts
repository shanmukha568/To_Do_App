import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  
  filter: string = 'All';
  sortKey: string = 'createdAt';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      console.log("Tasks fetched:", this.tasks);
      
      this.applyFilters();
    });
  }

  toggleComplete(task: Task) {
    this.taskService.toggleCompletion(task);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilters();
  }

  setSort(key: string) {
    this.sortKey = key;
    this.applyFilters();
  }

  applyFilters() {
    let temp = [...this.tasks];
    if (this.filter === 'Completed') temp = temp.filter(t => t.completed);
    else if (this.filter === 'Pending') temp = temp.filter(t => !t.completed);

    temp.sort((a, b) => {
      if (this.sortKey === 'dueDate') return (a.dueDate || '').localeCompare(b.dueDate || '');
      return a.createdAt - b.createdAt;
    });

    this.filteredTasks = temp;
  }

}
