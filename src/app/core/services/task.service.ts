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

  /** Get tasks as observable */
  getTasks = (): Observable<Task[]> => this.tasksSubject.asObservable();

  /** Add a new task to Firestore*/
  addTask = (task: Task): Promise<void> => {
    const newTask: Task = {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString() : undefined,
      createdAt: Date.now(),
      completed: false
    };
    return addDoc(this.taskCollection, newTask).then(() => {});
  };

  /** Delete a task by its ID */
  deleteTask = (id: string): Promise<void> => {
    return deleteDoc(doc(this.firestore, 'tasks', id));
  };

  /** Toggle task completion */
  toggleCompletion = (task: Task): Promise<void> => {
    return updateDoc(doc(this.firestore, 'tasks', task.id!), {
      completed: !task.completed
    });
  };
}