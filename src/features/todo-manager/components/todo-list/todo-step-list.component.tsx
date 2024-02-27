import { useAppSelector } from '../../../../app/hooks';
import { useEditMode } from '../../../edit-mode';
import { selectAllStepsByTodoId } from '../../slices/todo.slice';
import Todo from '../../types/todo.type';
import TodoStepItem from './todo-step.component';

type Props = {
  todo: Todo;
};

const TodoStepList = ({ todo }: Props) => {
  const steps = useAppSelector((state) =>
    selectAllStepsByTodoId(state.todos, todo.id)
  );

  const { isEditMode } = useEditMode();

  return (
    <ol contentEditable={isEditMode}>
      {steps.map((step) => (
        <TodoStepItem
          key={step.num}
          todoStep={step}
          todoId={todo.id}
        />
      ))}
    </ol>
  );
};

export default TodoStepList;
