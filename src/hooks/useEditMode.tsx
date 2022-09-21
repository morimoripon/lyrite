import React, { useEffect, useState } from 'react'

const useEditMode = (isEditMode: boolean): { editMode: boolean, toggleEditMode: Function } => {
  const [ editMode, setEditMode ] = useState<boolean>(isEditMode);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return { editMode, toggleEditMode };
}

export default useEditMode