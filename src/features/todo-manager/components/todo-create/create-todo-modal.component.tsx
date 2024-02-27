import { useAppDispatch } from '../../../../app/hooks';
import { Modal, ModalCloseButton } from '../../../modal';
import { createTodo } from '../../slices/todo.slice';
import Todo from '../../types/todo.type';
import CreateTodoForm from './create-todo-form.component';

const CreateTodoModal = () => {
  const dispatch = useAppDispatch();

  const handleCreateTodo = (todo: Todo) => {
    if (Object.values(todo).every(Boolean)) {
      dispatch(createTodo(todo.title, todo.description));
    }
  };

  return (
    <Modal searchParam={{ name: 'create-todo' }}>
      <h2>Create New Task</h2>
      <CreateTodoForm handleSubmit={handleCreateTodo} />
      <ModalCloseButton>Close</ModalCloseButton>
    </Modal>
  );
};

export default CreateTodoModal;
