import TodoFilterContextProvider from '../../contexts/todo-filter.context';
import TodoCounter from '../todo-counter/todo-counter.component';
import TodoFilter from '../todo-filter/todo-filter.component';
import TodoList from '../todo-list/todo-list.component';
import './todo-manager.scss';

const TodoManager = () => {
  return (
    <TodoFilterContextProvider>
      <div className="todo-manager">
        <h1>Todo list:</h1>
        <TodoFilter />
        <TodoList />
        Done <TodoCounter todoStatusToCount="DONE" />
      </div>
    </TodoFilterContextProvider>
  );
};

export default TodoManager;
