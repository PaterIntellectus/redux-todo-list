'use client';

import { ComponentProps, ReactNode } from 'react';
import { DropdownContextProvider } from '../';

type Props = {
  children: ReactNode;
  defaultState?: boolean;
} & ComponentProps<'div'>;

const Dropdown = ({ children, defaultState = false, ...divProps }: Props) => {
  return (
    <DropdownContextProvider defaultState={defaultState}>
      <div {...divProps}>{children}</div>
    </DropdownContextProvider>
  );
};
export default Dropdown;
