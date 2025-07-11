import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to_do_app';
  constructor(private dialog: MatDialog) {}

  // Open the task form dialog
  // This method opens a dialog for adding a new task.
  // It uses the MatDialog service to create a new instance of TaskFormComponent.
  // The TaskFormComponent will handle the form submission and task creation.
  // This allows users to add new tasks to the to-do list.
  // The dialog will close automatically after the task is added or the form is reset.
  // The TaskFormComponent is responsible for managing the task form, including validation and submission.
  openDialog(): void {
    this.dialog.open(TaskFormComponent, {
      width: '400px', // Adjust width as needed
    });
  }
}
