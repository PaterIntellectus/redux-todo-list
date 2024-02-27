'use client';

import { createContext, useCallback, useMemo, useState } from 'react';

type DropdownContextType = {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
};

export const DropdownContext = createContext<DropdownContextType>({
  isDropdownOpen: false,
  toggleDropdown: () => {},
});

type Props = {
  children: React.ReactNode;
  defaultState: boolean;
};

export const DropdownContextProvider = ({ children, defaultState }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(defaultState);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const contextValue: DropdownContextType = useMemo(
    () => ({
      isDropdownOpen,
      toggleDropdown,
    }),
    [isDropdownOpen, toggleDropdown]
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
};
