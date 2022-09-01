import { Input } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { TitleStyle, WriteInputStyle } from '../../styles/components/Input';

type Props = {
  title: string,
  changeTitle: (value: string) => void
}

const TitleInput = ({ title, changeTitle }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('e', e)
    console.log('target', e.target)
    if (e?.target) {
      console.log('change')
      changeTitle(e.target.value);
    }
  };
  return (
    <Input sx={{ borderColor: 'transparent' }} css={TitleStyle} onChange={handleChange} value={title} />
  )
}

export default TitleInput
