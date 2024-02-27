import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectTodoById, setTodoStatus } from '../../slices/todo.slice';
import './todo-list.scss';

type Props = {
  todoId: string;
};

const TodoToggleStatusInput = ({ todoId }: Props) => {
  const dispatch = useAppDispatch();

  const defaultStatus = useAppSelector(
    (state) => selectTodoById(state.todos, todoId)?.status
  );

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTodoStatus({
        id: todoId,
        newStatus: e.target.checked ? 'DONE' : 'PENDING',
      })
    );
  };

  return (
    <input
      className="todo-toggle-status-input"
      title="Toggle Task State"
      checked={defaultStatus === 'DONE'}
      type="checkbox"
      onChange={handleToggle}
    />
  );
};

export default TodoToggleStatusInput;
