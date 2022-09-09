import { Button } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { WriteAreaBox, WriteInputBox } from '../../styles/components/Box'
import { AddButton } from '../../styles/components/Button';
import WriteInput from '../elements/WriteInput';

type Props = {
  lyrics: string[],
  setLyrics: Function,
  addSentence: Function
}

const WriteArea = ({ lyrics, setLyrics, addSentence }: Props) => {
  /* const [ lyrics, setLyrics ] = useState<string[]>(['', '', '', '', '', '']); */

  const changeLyrics = (index: number, lyric: string) => {
    setLyrics([
      ...lyrics.slice(0, index),
      lyric,
      ...lyrics.slice(index + 1)
    ]);
  };

  return (
    <Box css={WriteInputBox}>
      {lyrics.map((lyric, index) => <WriteInput key={index} lyric={lyric} changeLyrics={(value) => changeLyrics(index, value)} />)}
      <Button css={AddButton} color='secondary' variant='outlined' onClick={() => addSentence()}>+</Button>
    </Box>
  );
}

export default WriteArea
