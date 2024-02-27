import { useContext, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { TodoFilterDataContext } from '../../contexts/todo-filter.context';
import { fetchTodos, selectAllTodos } from '../../slices/todo.slice';
import TodoListItem from './todo-list-item.component';
import './todo-list.scss';

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => selectAllTodos(state.todos));
  const todosStatus = useAppSelector((state) => state.todos.status);

  const [, setSearchParams] = useSearchParams();

  const { statusFilter } = useContext(TodoFilterDataContext);

  const filteredTodos = useMemo(
    () =>
      statusFilter
        ? todos.filter((todo) => todo.status === statusFilter)
        : todos,
    [statusFilter, todos]
  );

  const openCreateTodoModal = () => {
    setSearchParams(
      (prev) => {
        prev.append('create-todo', 'true');
        return prev;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [todosStatus, dispatch]);

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todoId={todo.id}
        />
      ))}

      <li>
        <button
          type="button"
          onClick={openCreateTodoModal}
        >
          Create new Todo
        </button>
      </li>
    </ul>
  );
};
export default TodoList;
