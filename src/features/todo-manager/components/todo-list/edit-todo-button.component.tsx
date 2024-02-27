import { EditModeToggleButton } from '../../../edit-mode';
import svg from '/pen-square-svgrepo-com.svg';

const EditTodoButton = () => {
  return (
    <EditModeToggleButton>
      <img
        className="todo-list-item-button"
        src={svg}
        alt="toggle edit mode"
        width={30}
        height={30}
      />
    </EditModeToggleButton>
  );
};

export default EditTodoButton;
