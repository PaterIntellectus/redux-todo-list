import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectTodoById } from '../../slices/todo.slice';
import Todo from '../../types/todo.type';
import './todo-create.scss';

type Props = {
  handleSubmit: (todo: Todo) => void;
  todoId?: string;
};

const CreateTodoForm = ({ handleSubmit, todoId = '' }: Props) => {
  const initialTodo = useAppSelector(
    (state): Todo => selectTodoById(state.todos, todoId)
  );

  const [todo, setTodo] = useState(
    initialTodo || { title: '', description: '' }
  );

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTodo({ ...todo, title: e.target.value });
  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTodo({ ...todo, description: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(todo);
      }}
      className="todo-form"
    >
      <label htmlFor="title">Task title</label>
      <input
        id="title"
        className="todo-form-input"
        type="text"
        name="title"
        value={todo.title}
        onChange={onTitleChange}
        required={true}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        className="todo-form-input"
        name="description"
        value={todo.description}
        onChange={onDescriptionChange}
        placeholder="30 characters maximum"
      />

      <button
        className="todo-form-button"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateTodoForm;
