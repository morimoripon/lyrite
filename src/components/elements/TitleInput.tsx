import { Input } from '@mui/material';
import React, { useState } from 'react'
import { TitleInputStyle } from '../../styles/components/Input';

type Props = {
  title: string,
  changeTitle: (value: string) => void
}

const TitleInput = ({ title, changeTitle }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e?.target) {
      changeTitle(e.target.value);
    }
  };
  return (
    <Input multiline placeholder='タイトルを入力' css={TitleInputStyle} onChange={handleChange} value={title} />
  )
}

export default TitleInput
