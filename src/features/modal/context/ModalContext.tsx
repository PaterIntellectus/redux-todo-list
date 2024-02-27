'use client';

import {
  RefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

type ModalContextType = {
  close: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  close: () => {},
});

type Props = {
  children: React.ReactNode;
  dialogRef: RefObject<HTMLDialogElement>;
};

export const ModalContextProvider = ({ children, dialogRef }: Props) => {
  const close = useCallback(() => {
    dialogRef.current?.close();
  }, [dialogRef]);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, [dialogRef]);

  const contextValue: ModalContextType = useMemo(
    () => ({
      close,
    }),
    [close]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
