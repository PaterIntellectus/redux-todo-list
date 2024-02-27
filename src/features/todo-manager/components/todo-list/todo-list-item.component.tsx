import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Dropdown, DropdownContent, DropdownTrigger } from '../../../dropdown';
import { useEditMode } from '../../../edit-mode';
import { selectTodoById, updateTodo } from '../../slices/todo.slice';
import Todo from '../../types/todo.type';
import EditTodoButton from './edit-todo-button.component';
import RemoveTodoButton from './remove-todo-button.component';
import './todo-list.scss';
import TodoStepList from './todo-step-list.component';
import TodoToggleStatusInput from './todo-toggle-status-input.component';

type Props = { todoId: string };

const TodoListItem = ({ todoId }: Props) => {
  const todo = useAppSelector((state) => selectTodoById(state.todos, todoId));

  return (
    <li className="todo-list-item">
      {todo.description || todo.steps?.length ? (
        <Dropdown>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <DropdownTrigger>
              <TodoHeader todo={todo} />
            </DropdownTrigger>
            <TodoActions todoId={todo.id} />
          </div>
          <DropdownContent className="todo-list-item-info">
            {todo.description && (
              <p className="todo-list-item-description">{todo.description}</p>
            )}
            {todo.steps && <TodoStepList todo={todo} />}
          </DropdownContent>
        </Dropdown>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <TodoHeader todo={todo} />
          <TodoActions todoId={todo.id} />
        </div>
      )}
    </li>
  );
};

type TodoActionsProps = {
  todoId: string;
};

const TodoActions = ({ todoId }: TodoActionsProps) => (
  <div className="todo-list-item-button-group">
    <RemoveTodoButton todoId={todoId} />

    <EditTodoButton />

    <TodoToggleStatusInput todoId={todoId} />
  </div>
);

type TodoHeaderProps = {
  todo: Todo;
};

const TodoHeader = ({ todo }: TodoHeaderProps) => {
  const dispatch = useAppDispatch();

  const { isEditMode } = useEditMode();

  const handleBlur = (e: FormEvent<HTMLHeadingElement>) => {
    dispatch(
      updateTodo({ id: todo.id, title: e.currentTarget.textContent || '' })
    );
  };

  return (
    <div
      contentEditable={isEditMode}
      onBlur={handleBlur}
    >
      <h4
        style={{
          userSelect: 'none',
          paddingBlock: 20,
          color: isEditMode ? 'red' : '',
        }}
        className={todo.status === 'DONE' ? 'todo--done' : undefined}
      >
        {todo.title}
      </h4>
    </div>
  );
};

export default TodoListItem;
