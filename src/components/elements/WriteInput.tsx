import { Box, Input } from '@mui/material';
import React, { useState } from 'react'
import { WriteInputStyle } from '../../styles/components/Input';
import { css } from "@emotion/react";
import { WriteBox } from '../../styles/components/Box';

type Props = {
  lyric: string,
  editMode: boolean,
  width: number,
  changeLyrics: Function/* (value: string) => void */
}

const WriteInput = ({ lyric, editMode, width, changeLyrics }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e?.target) {
      changeLyrics(e.target.value);
    }
  };
  return (
    <Box css={WriteBox(width)}>
      <Input 
        css={WriteInputStyle}
        onChange={handleChange}
        value={lyric}
      />
    </Box>
  )
}

export default WriteInput
