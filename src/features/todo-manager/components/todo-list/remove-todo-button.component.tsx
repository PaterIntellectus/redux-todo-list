import { useAppDispatch } from '../../../../app/hooks';
import { removeTodo } from '../../slices/todo.slice';
import './todo-list.scss';
import svg from '/big-trash-can-svgrepo-com.svg';

type Props = { todoId: string };

const RemoveTodoButton = ({ todoId }: Props) => {
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(removeTodo(todoId));
  };

  return (
    <button
      className="todo-list-item-button"
      type="button"
      title="Remove task"
      onClick={removeTask}
    >
      <img
        src={svg}
        alt="Remove todo image"
        width={30}
        height={30}
      />
    </button>
  );
};

export default RemoveTodoButton;
