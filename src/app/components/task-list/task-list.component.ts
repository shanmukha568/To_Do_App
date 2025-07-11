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
  // The dialog will display the task's details, such as its title, description, and other properties.
  // The dialog is defined in the task-list.component.html file and is opened using the MatDialog service.
  // The ViewChild decorator is used to get a reference to the dialog template.
  // This reference is used to open the dialog when a task's description is requested.
  @ViewChild('taskDescriptionDialog') taskDescriptionDialog!: TemplateRef<any>;

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  // Initialize the component by fetching tasks from the TaskService
  // and applying the initial filters and sorting.
  // This method subscribes to the task data and updates the tasks array.
  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  // Toggle the completion status of a task
  // This method calls the TaskService to update the task's completion status.
  // It takes a Task object as an argument and updates its completed property.
  // The TaskService handles the Firestore update.
  // This method is used to mark tasks as completed or pending.
  // It updates the task's completed status and reflects the change in the UI.
  toggleComplete(task: Task) {
    this.taskService.toggleCompletion(task);
  }

  // Delete a task by its ID
  // This method calls the TaskService to delete the task from Firestore.
  // It takes the task's ID as an argument and removes it from the database.
  // This method is used to remove tasks from the task list.
  // It updates the tasks array and reflects the change in the UI.
  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  // Set the filter criteria for tasks
  // This method updates the filter property and applies the filters to the tasks.
  // It takes a string argument representing the filter type (e.g., 'Completed', 'Pending').
  // The applyFilters method is called to update the displayed tasks based on the new filter.
  // This method is used to filter tasks based on their completion status.
  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilters();
  }

  // Set the sorting key for tasks
  // This method updates the sortKey property and applies the filters to the tasks.
  // It takes a string argument representing the sorting key (e.g., 'dueDate', 'createdAt').
  // The applyFilters method is called to update the displayed tasks based on the new sorting key.
  // This method is used to sort tasks based on different criteria.
  // It updates the sortKey and reflects the change in the UI.
  // The sorting can be based on due date or creation date.
  setSort(key: string) {
    this.sortKey = key;
    this.applyFilters();
  }

  // Apply filters and sorting to the tasks
  // This method filters the tasks based on the selected filter criteria (Completed or Pending)
  // and sorts them based on the selected sorting key (dueDate or createdAt).
  // It updates the filteredTasks array and then paginates the results.
  // The applyFilters method is called whenever the filter or sort criteria change.
  // It ensures that the displayed tasks are up-to-date with the current filter and sort settings.
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
  // It updates the currentPage and pageSize properties and calls updatePaginatedTasks to refresh the displayed tasks.
  // The PageEvent object contains the new page index and page size.
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedTasks();
  }


  // Update the paginated tasks based on the current page and page size
  // This method calculates the start and end indices for the current page and slices the filteredTasks
  // array to get the tasks for the current page.
  // It updates the paginatedTasks array with the tasks for the current page.
  updatePaginatedTasks() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex);
  }

  // Open the task description dialog
  // This method opens a dialog to display the description of the selected task.
  // It sets the selectedTask property to the task whose description is to be shown.
  // The dialog is opened using the MatDialog service and the taskDescriptionDialog template reference.
  // This allows users to view detailed information about a task, such as its description, without
  // cluttering the main task list view.
  openDescriptionDialog(task: Task) {
    this.selectedTask = task;
    this.dialog.open(this.taskDescriptionDialog);
  }
}
