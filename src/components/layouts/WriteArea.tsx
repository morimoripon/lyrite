import { Box } from '@mui/system'
import React, { useState } from 'react'
import { WriteAreaBox, WriteInputBox } from '../../styles/components/Box'
import WriteInput from '../elements/WriteInput';

type Props = {
  lyrics: string[],
  setLyrics: Function
}

const WriteArea = ({ lyrics, setLyrics }: Props) => {
  /* const [ lyrics, setLyrics ] = useState<string[]>(['', '', '', '', '', '']); */

  const changeLyrics = (index: number, lyric: string) => {
    console.log(lyric)
    setLyrics([
      ...lyrics.slice(0, index),
      lyric,
      ...lyrics.slice(index + 1)
    ]);
  };

  return (
    <Box css={WriteInputBox}>
      {lyrics.map((lyric, index) => <WriteInput key={index} lyric={lyric} changeLyrics={(value) => changeLyrics(index, value)} />)}
    </Box>
  );
}

export default WriteArea
