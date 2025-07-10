import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskCollection = collection(this.firestore, 'tasks');
  constructor(private firestore: Firestore) {}

  getTasks() {
    return collectionData(this.taskCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Task) {
    return addDoc(this.taskCollection, task);
  }

  deleteTask(id: string) {
    const taskDoc = doc(this.taskCollection, id);
    return deleteDoc(taskDoc);
  }

  updateTask(id: string, data: Partial<Task>) {
    const taskDoc = doc(this.taskCollection, id);
    return updateDoc(taskDoc, data);
  }
}