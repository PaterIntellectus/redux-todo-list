export type TodoStatus = 'PENDING' | 'DONE';

export type TodoStep = {
  num: number;
  title: string;
  status: TodoStatus;
};

type Todo = {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  steps: Array<TodoStep>;
};
export default Todo;
