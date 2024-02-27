import { ReactNode, useContext } from 'react';
import {
  StatusFilter,
  TodoFilterControlContext,
} from '../../contexts/todo-filter.context';

type Props = {
  children: ReactNode;
  value?: StatusFilter;
  defaultChecked?: boolean;
};

const TodoFilterItem = ({ value, children, defaultChecked }: Props) => {
  const { setStatusFilter } = useContext(TodoFilterControlContext);

  const handleChange = () => {
    setStatusFilter(value);
  };

  return (
    <label className="todo-filter-item">
      <input
        type="radio"
        name="todo-status"
        value={value}
        onChange={handleChange}
        defaultChecked={defaultChecked}
      />
      {children}
    </label>
  );
};

export default TodoFilterItem;
