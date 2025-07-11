import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from '../../models/task.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  paginatedTasks: Task[] = [];

  filter: string = 'Pending';
  sortKey: string = 'createdAt';

  pageSize = 5;
  currentPage = 0;

  selectedTask: Task | null = null;

  // Template reference for the task description dialog
  // This allows us to open a dialog to show the task description when a task is clicked
  @ViewChild('taskDescriptionDialog') taskDescriptionDialog!: TemplateRef<any>;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  // Initialize the component by fetching tasks from the TaskService
  // and applying the initial filters and sorting.
  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  // Toggle the completion status of a task
  // This method is used to mark tasks as completed or pending.
  toggleComplete(task: Task) {
    this.taskService.toggleCompletion(task);
  }

  // Delete a task by its ID
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  // Set the filter criteria for tasks
  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilters();
  }

  // Set the sorting key for tasks
  // This method updates the sortKey property and applies the filters to the tasks.
  setSort(key: string) {
    this.sortKey = key;
    this.applyFilters();
  }

  // Apply filters and sorting to the tasks
  applyFilters() {
    let temp = [...this.tasks];

    // Filter
    if (this.filter === 'Completed') temp = temp.filter(t => t.completed);
    else if (this.filter === 'Pending') temp = temp.filter(t => !t.completed);

    // Sort 
    temp.sort((a, b) => {
      if (this.sortKey === 'dueDate') {
        return (a.dueDate || '').localeCompare(b.dueDate || '');
      }
      return a.createdAt - b.createdAt;
    });

    this.filteredTasks = temp;
    this.updatePaginatedTasks();
  }

  // Handle pagination changes
  // This method is triggered when the user changes the page size or navigates to a different page.
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedTasks();
  }


  // Update the paginated tasks based on the current page and page size
  updatePaginatedTasks() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  // Open the task description dialog
  // This method opens a dialog to display the description of the selected task.
  openDescriptionDialog(task: Task) {
    this.selectedTask = task;
    this.dialog.open(this.taskDescriptionDialog);
  }
}
