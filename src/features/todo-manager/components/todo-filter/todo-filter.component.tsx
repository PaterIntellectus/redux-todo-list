import TodoFilterItem from './todo-filter-item.components';
import './todo-filter.scss';

const TodoFilter = () => {
  return (
    <div className="todo-filter">
      <TodoFilterItem defaultChecked={true}>All</TodoFilterItem>
      <TodoFilterItem value="PENDING">Pending</TodoFilterItem>
      <TodoFilterItem value="DONE">Done</TodoFilterItem>
    </div>
  );
};

export default TodoFilter;
