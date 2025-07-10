import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskCollection = collection(this.firestore, 'tasks');
  private tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private firestore: Firestore) {
    collectionData(this.taskCollection, { idField: 'id' }).subscribe(data => {
      this.tasks$.next(data as Task[]);
    });
  }

  getTasks() {
    return this.tasks$.asObservable();
  }

  async addTask(task: Task) {
    task.dueDate = task.dueDate ? new Date(task.dueDate).toISOString() : undefined;
    task.createdAt = Date.now();
    task.completed = false;
    await addDoc(this.taskCollection, task);
  }

  async deleteTask(id: string) {
    await deleteDoc(doc(this.firestore, 'tasks', id));
  }

  async toggleCompletion(task: Task) {
    console.log("Testing toggleCompletion for task:", task);
    
    await updateDoc(doc(this.firestore, 'tasks', task.id!), { completed: !task.completed });
  }
}