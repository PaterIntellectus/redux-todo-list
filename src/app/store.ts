import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/api.slice';
import todoReducer from '../features/todo-manager/slices/todo.slice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
