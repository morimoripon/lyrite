import { Box, Input } from '@mui/material';
import React, { useState } from 'react'
import { WriteInputStyle } from '../../styles/components/Input';
import { css } from "@emotion/react";

type Props = {
  lyric: string,
  editMode: boolean,
  width: number,
  changeLyrics: Function/* (value: string) => void */
}

const WriteInput = ({ lyric, editMode, width, changeLyrics }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('e', e)
    console.log('target', e.target)
    if (e?.target) {
      console.log('change')
      changeLyrics(e.target.value);
    }
  };
  return (
    <Box
      css={css`
        width: ${width}px;
      `}
    >
      <Input 
        css={WriteInputStyle}
        onChange={handleChange}
        value={lyric}
      />
    </Box>
  )
}

export default WriteInput
