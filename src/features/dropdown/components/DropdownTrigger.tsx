'use client';

import { ComponentProps, MouseEvent, useContext } from 'react';
import { DropdownContext, DropdownRotatingImage } from '../';

type Props = ComponentProps<'div'>;

const DropdownTrigger = ({ children, onClick, ...buttonProps }: Props) => {
  const { toggleDropdown } = useContext(DropdownContext);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    toggleDropdown();
    onClick?.(e);
  };

  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
      {...buttonProps}
    >
      {children || (
        <DropdownRotatingImage
          width={12}
          height={12}
          openDirection="top"
          closeDirection="bottom"
        />
      )}
    </div>
  );
};
export default DropdownTrigger;
