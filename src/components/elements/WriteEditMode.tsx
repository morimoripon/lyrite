import { Box, Input, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { WriteInputStyle } from '../../styles/components/Input';
import { css } from "@emotion/react";
import { MenuCurrentId } from '../../types/type';
import MoreVert from '@mui/icons-material/MoreVert';
import { EditModeMoreIcon } from '../../styles/components/Icon';
import { EditBox, EditBoxWrite } from '../../styles/components/Box';

type Props = {
  lyric: string,
  id: MenuCurrentId,
  width: number,
  menuOpen: boolean,
  selected: boolean,
  setMenuTarget: Function
}

const WriteEditMode = ({ lyric, id, width, menuOpen, selected, setMenuTarget }: Props) => {
  const handleClick = (e: any, id: MenuCurrentId) => {
    console.log('click')
    e.preventDefault();
    e.stopPropagation();
    setMenuTarget(e.target, id);
  };

  return (
    <Box css={EditBox(width, selected)}>
      <Box css={EditBoxWrite}>
        {lyric}
      </Box>
      <MoreVert
        css={EditModeMoreIcon}
        onClick={(e) => handleClick(e, id)}
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
      />
    </Box>
  )
}

export default WriteEditMode
