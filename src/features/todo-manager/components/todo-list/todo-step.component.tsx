import { useAppDispatch } from '../../../../app/hooks';
import { useEditMode } from '../../../edit-mode';
import { setStepStatus } from '../../slices/todo.slice';
import { TodoStep } from '../../types/todo.type';
import './todo-list.scss';

type Props = {
  todoId: string;
  todoStep: TodoStep;
};

const TodoStepItem = ({ todoStep, todoId }: Props) => {
  const dispatch = useAppDispatch();

  const { isEditMode } = useEditMode();

  const isStepDone = todoStep.status === 'DONE';

  const handleClick = () => {
    if (isEditMode) return;
    dispatch(
      setStepStatus({
        todoId,
        stepNum: todoStep.num,
        stepStatus: isStepDone ? 'PENDING' : 'DONE',
      })
    );
  };

  return (
    <li
      onClick={handleClick}
      className={isStepDone ? 'todo--done' : undefined}
    >
      {todoStep.title}
    </li>
  );
};

export default TodoStepItem;
