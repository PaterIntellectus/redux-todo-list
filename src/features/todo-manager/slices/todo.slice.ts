import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import Todo, { TodoStatus } from '../types/todo.type';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('todos.json');
  const json = await response.json();
  return json;
});

const todosAdapter = createEntityAdapter<Todo>();

type StateExtension = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
const stateExtension: StateExtension = { status: 'idle', error: null };

const initialState = todosAdapter.getInitialState(stateExtension);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo: {
      reducer: todosAdapter.addOne,
      prepare: (title: string, description?: string): { payload: Todo } => {
        const preparedDescription = description ? description.slice(0, 30) : '';

        return {
          payload: {
            id: nanoid(),
            title,
            description: preparedDescription,
            status: 'PENDING',
            steps: [],
          },
        };
      },
    },

    removeTodo: todosAdapter.removeOne,
    updateTodo1: {
      reducer: todosAdapter.setOne,
      prepare: (
        id: string,
        title: string,
        description: string
      ): { payload: Todo } => {
        const preparedDescription = description ? description.slice(0, 30) : '';

        return {
          payload: {
            id,
            title,
            description: preparedDescription,
            status: 'PENDING',
            steps: [],
          },
        };
      },
    },

    updateTodo: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        description?: string;
      }>
    ) => {
      const { id, title, description } = action.payload;

      const todo = state.entities[id];

      if (todo) {
        if (title) {
          todo.title = title;
        }
        if (description) {
          todo.description = description;
        }
      }
    },

    setTodoStatus: (
      state,
      action: PayloadAction<{ id: string; newStatus: TodoStatus }>
    ) => {
      const { id, newStatus } = action.payload;

      const todo = state.entities[id];

      if (todo && todo.status !== newStatus) {
        todo.status = newStatus;
      }
    },

    setStepStatus: (
      state,
      action: PayloadAction<{
        todoId: string;
        stepNum: number;
        stepStatus: TodoStatus;
      }>
    ) => {
      const { todoId, stepNum, stepStatus } = action.payload;

      const step = state.entities[todoId].steps.find(
        (step) => step.num === stepNum
      );

      if (!step) {
        return;
      }

      step.status = stepStatus;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        todosAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || null;
      });
  },
});

export const {
  createTodo,
  removeTodo,
  updateTodo,
  setTodoStatus,
  setStepStatus: setStepStatus,
} = todoSlice.actions;

export default todoSlice.reducer;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectTotal: selectTotalNumberOfTodos,
} = todosAdapter.getSelectors();

export function selectAllStepsByTodoId(
  state: EntityState<Todo, string>,
  id: string
) {
  const todo = selectTodoById(state, id);
  return todo.steps;
}
