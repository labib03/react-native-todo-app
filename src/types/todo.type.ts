export interface TodoType {
  id: string;
  title: string;
  notes: string;
  date: Date;
  isCompleted: boolean;
}

export interface TodosReducer {
  todos: TodoType[];
}
