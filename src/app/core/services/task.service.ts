import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly taskCollection = collection(this.firestore, 'tasks');
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(private readonly firestore: Firestore) {
    // Initialize or Subscribe tasks from Firestore
    collectionData(this.taskCollection, { idField: 'id' }).subscribe(data => {
      this.tasksSubject.next(data as Task[]);
    });
  }

  // Get the current list of tasks as an Observable
  getTasks = (): Observable<Task[]> => this.tasksSubject.asObservable();

  // Add a new task to the Firestore collection
  addTask = (task: Task): Promise<void> => {
    const newTask: Task = {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
      createdAt: Date.now(),
      completed: false
    };
    return addDoc(this.taskCollection, newTask).then(() => {});
  };

  // Delete a task by its ID
  // This method removes the task document from the Firestore collection.
  deleteTask = (id: string): Promise<void> => {
    return deleteDoc(doc(this.firestore, 'tasks', id));
  };

  // Toggle the completion status of a task
  // This method updates the 'completed' field of the task document in Firestore.
  toggleCompletion = (task: Task): Promise<void> => {
    return updateDoc(doc(this.firestore, 'tasks', task.id!), {
      completed: !task.completed
    });
  };
}