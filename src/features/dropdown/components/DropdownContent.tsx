'use client';

import { ComponentProps, ReactNode, useContext } from 'react';
import { DropdownContext } from '../';

type Props = {
  children: ReactNode;
} & ComponentProps<'div'>;

const DropdownContent = ({ children, style, ...divProps }: Props) => {
  const { isDropdownOpen } = useContext(DropdownContext);

  return (
    <div
      style={{
        display: isDropdownOpen ? 'block' : 'none',
        ...style,
      }}
      {...divProps}
    >
      {children}
    </div>
  );
};
export default DropdownContent;
