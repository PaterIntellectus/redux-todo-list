'use client';

import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModalContextProvider } from '../';

type Props = {
  searchParam?: { name: string; value?: string };
  onClose?: () => void;
  children: React.ReactNode;
} & React.ComponentProps<'dialog'>;

const Modal = ({
  searchParam = { name: 'showModal', value: 'true' },
  onClose,
  children,
  ...dialogProps
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isShowModal = searchParams.has(searchParam.name, searchParam.value);

  const handleCloseDialog = () => {
    setSearchParams(
      (prevSearchParams) => {
        prevSearchParams.delete(searchParam.name);
        return prevSearchParams;
      },
      { replace: true }
    );
    onClose?.();
  };

  return (
    isShowModal && (
      <ModalContextProvider dialogRef={dialogRef}>
        <dialog
          ref={dialogRef}
          onClose={handleCloseDialog}
          {...dialogProps}
        >
          {children}
        </dialog>
      </ModalContextProvider>
    )
  );
};
export default Modal;
