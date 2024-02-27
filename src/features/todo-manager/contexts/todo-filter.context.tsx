import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';
import { TodoStatus } from '../types/todo.type';

export type StatusFilter = TodoStatus | undefined;

export type TodoFilterDataContextType = {
  statusFilter: StatusFilter;
};
export type TodoFilterControlContextType = {
  setStatusFilter: Dispatch<SetStateAction<StatusFilter>>;
};

export const TodoFilterDataContext = createContext<TodoFilterDataContextType>({
  statusFilter: undefined,
});
export const TodoFilterControlContext =
  createContext<TodoFilterControlContextType>({
    setStatusFilter: () => {},
  });

type Props = {
  children: React.ReactNode;
};

const TodoFilterContextProvider = ({ children }: Props) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(undefined);

  const dataContextValue: TodoFilterDataContextType = useMemo(
    () => ({
      statusFilter,
    }),
    [statusFilter]
  );

  const controlContextValue: TodoFilterControlContextType = useMemo(
    () => ({
      setStatusFilter,
    }),
    []
  );
  return (
    <TodoFilterDataContext.Provider value={dataContextValue}>
      <TodoFilterControlContext.Provider value={controlContextValue}>
        {children}
      </TodoFilterControlContext.Provider>
    </TodoFilterDataContext.Provider>
  );
};

export default TodoFilterContextProvider;
