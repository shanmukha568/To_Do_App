import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../reducers/task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('task');
export const selectAllTasks = createSelector(selectTaskState, (state) => state.tasks);