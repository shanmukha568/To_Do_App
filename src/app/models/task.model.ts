export interface Task {
  id?: string;
  title: string;
  completed: boolean;
  description?: string;
  category?: 'Work' | 'Personal';
  dueDate?: string;
  createdAt: string;
}

// export interface Task {
//   id: number;
//   title: string;
//   completed: boolean;
// }