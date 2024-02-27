import { ComponentProps, ReactNode } from 'react';
import useEditMode from '../hooks/useEditMode.hook';

type Props = {
  children: ReactNode;
} & ComponentProps<'button'>;

const EditModeToggleButton = ({ children, onClick, ...buttonProps }: Props) => {
  const { toggleEditMode } = useEditMode();

  return (
    <button
      type="button"
      title="Edit Mode"
      onClick={(e) => {
        toggleEditMode();
        onClick?.(e);
      }}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default EditModeToggleButton;
