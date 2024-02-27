import { useSearchParams } from 'react-router-dom';

export default function useEditMode() {
  const [searchParams, setSearchParams] = useSearchParams();

  const isEditMode = searchParams.has('edit-mode', 'true');
  const toggleEditMode = () => {
    setSearchParams((prev) => {
      prev.set('edit-mode', isEditMode ? 'false' : 'true');
      return prev;
    });
  };

  return { isEditMode, toggleEditMode };
}
