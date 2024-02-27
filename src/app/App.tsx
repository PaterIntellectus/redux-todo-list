import CreateTodoModal from '../features/todo-manager/components/todo-create/create-todo-modal.component';
import TodoManager from '../features/todo-manager/components/todo-manager/todo-manager.components';
import './App.scss';

function App() {
  return (
    <>
      <main>
        <TodoManager />
      </main>
      <CreateTodoModal />
      {undefined}
    </>
  );
}

export default App;
