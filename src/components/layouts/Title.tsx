import { Box } from '@mui/system'
import React, { useState } from 'react'
import { TitleBox } from '../../styles/components/Box';
import TitleInput from '../elements/TitleInput';

type Props = {
  title: string,
  setTitle: Function
}

const Title = ({ title, setTitle }: Props) => {

  const changeTitle = (newTitle: string) => {
    console.log(newTitle)
    setTitle(newTitle);
  };

  return (
    <Box css={TitleBox}>
      <TitleInput title={title} changeTitle={changeTitle} />
    </Box>
  );
}

export default Title
