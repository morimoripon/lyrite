import React, { useEffect, useState } from 'react'

const useSaveDone = (saved: boolean): [ boolean, Function ] => {
  const [ isInitial, setIsInitial ] = useState<boolean>(true);
  const [ hasSaved, setHasSaved ] = useState<boolean>(saved);

  const onSaved = () => {
    setHasSaved(prevState => !prevState);
  }

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return; 
    }
    if (!hasSaved) {
      setHasSaved(true);
    }
  }, [ hasSaved ]);

  return [ hasSaved, onSaved ];
}

export default useSaveDone