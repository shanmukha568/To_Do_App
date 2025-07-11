export interface Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  category?: string;
  dueDate?: string;
}