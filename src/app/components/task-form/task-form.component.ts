import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;
  categories = ['Work', 'Personal', 'Other'];

  constructor(private fb: FormBuilder, private taskService: TaskService, private dialogRef: MatDialogRef<TaskFormComponent>) {
    this.taskForm = this.fb.group({
      title: [''],
      description: [''],
      category: [''],
      dueDate: ['']
    });
  }
  
  ngOnInit(): void {}
  // Custom validator to disable past dates
  // This function checks if the selected date is today or in the future
  disablePastDates = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize time
    return d ? d >= today : false;
  };

  // Function to handle form submission
  // It checks if the form is valid, adds the task using the TaskService, resets the form, and closes the dialog
  // If the form is invalid, it will not proceed 
  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.taskForm.reset();
      this.dialogRef.close();
    }
  }
}
