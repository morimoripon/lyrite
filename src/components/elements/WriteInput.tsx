import { Input } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { WriteInputStyle } from '../../styles/components/Input';

type Props = {
  lyric: string,
  changeLyrics: (value: string) => void
}

const WriteInput = ({ lyric, changeLyrics }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('e', e)
    console.log('target', e.target)
    if (e?.target) {
      console.log('change')
      changeLyrics(e.target.value);
    }
  };
  return (
    <Input sx={{ borderColor: 'transparent' }} css={WriteInputStyle} onChange={handleChange} value={lyric} />
  )
}

export default WriteInput
