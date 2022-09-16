import { Box } from '@mui/system'
import React, { useState } from 'react'
import { ColumnDisplay } from '../../styles/components/Box';
import ColumnChangeModal from './ColumnChangeModal';

type Props = {
  lyricColumn: string,
  setLyricColumn: Function,
}

const ColumnChangeSection = ({ lyricColumn, setLyricColumn }: Props) => {
  const [ open, setOpen ] = useState(false); 

  const handleClick = () => {
    setOpen(true);
  }

  return ( 
    <>
      <Box css={ColumnDisplay} onClick={handleClick}>{lyricColumn}</Box>
      <ColumnChangeModal 
        open={open}
        lyricColumn={lyricColumn}
        setOpen={setOpen}
        setLyricColumn={setLyricColumn}
      />
    </>
  );
}

export default ColumnChangeSection