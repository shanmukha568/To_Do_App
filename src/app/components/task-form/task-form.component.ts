import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from '../../models/task.model';
import { addTask } from 'src/app/store/actions/task.actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    category: ['Work'],
    dueDate: ['']
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    if (this.taskForm.invalid) return;
    const formValue = this.taskForm.value;
    const task: Task = {
      title: formValue.title!, // Non-null assertion since title is required
      description: formValue.description ?? '',
      category: (formValue.category as 'Work' | 'Personal') ?? 'Work',
      dueDate: formValue.dueDate ?? '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.store.dispatch(addTask({ task }));
    this.taskForm.reset();
  }

  ngOnInit(): void {
  }

}
