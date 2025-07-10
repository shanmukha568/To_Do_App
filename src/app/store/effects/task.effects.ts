import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { loadTasks, loadTasksSuccess } from '../actions/task.actions';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from '../../models/task.model';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() => this.actions$.pipe(
    ofType(loadTasks),
    switchMap(() => this.taskService.getTasks().pipe(
      map((tasks: Task[]) => loadTasksSuccess({ tasks }))
    ))
  ));

  constructor(private actions$: Actions, private taskService: TaskService) {}
}