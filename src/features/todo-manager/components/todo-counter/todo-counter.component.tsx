import { useAppSelector } from '../../../../app/hooks';
import {
  selectAllTodos,
  selectTotalNumberOfTodos,
} from '../../slices/todo.slice';
import { TodoStatus } from '../../types/todo.type';

type Props = {
  todoStatusToCount?: TodoStatus;
};

const TodoCounter = ({ todoStatusToCount }: Props) => {
  const allTodosLength = useAppSelector((state) =>
    selectTotalNumberOfTodos(state.todos)
  );

  const filteredTodosLength = useAppSelector(
    (state) =>
      selectAllTodos(state.todos).filter(
        (todo) => todo.status === todoStatusToCount
      ).length
  );

  return (
    <span>{`${
      todoStatusToCount ? `${filteredTodosLength}/` : ''
    }${allTodosLength}`}</span>
  );
};

export default TodoCounter;
