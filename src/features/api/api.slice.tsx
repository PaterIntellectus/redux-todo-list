import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Todo from '../todos/types/todo.type';

const tags = {
  todo: 'todo',
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: Object.values(tags),
  endpoints: (builder) => ({
    getTodos: builder.query<Array<Todo>, void>({
      query: () => '/todos.json',
      providesTags: () => [tags.todo],
    }),

    postTodos: builder.mutation<void, Array<Todo>>({
      query: (posts) => ({
        url: '/todos.json',
        method: 'POST',
        body: posts,
      }),
      invalidatesTags: [tags.todo],
    }),
  }),
});

export const { useGetTodosQuery, usePostTodosMutation } = apiSlice;
