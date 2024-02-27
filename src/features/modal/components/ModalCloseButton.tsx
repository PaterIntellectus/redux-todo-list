'use client';

import { MouseEvent, ReactNode, useContext } from 'react';
import { ModalContext } from '../';

type Props = { children: ReactNode } & React.ComponentProps<'button'>;

const ModalCloseButton = ({ onClick, children, ...buttonProps }: Props) => {
  const { close } = useContext(ModalContext);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    close();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
export default ModalCloseButton;
