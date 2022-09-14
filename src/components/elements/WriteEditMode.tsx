import { Box, Input, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { WriteInputStyle } from '../../styles/components/Input';
import { css } from "@emotion/react";
import { MenuCurrentId } from '../../types/type';
import MoreVert from '@mui/icons-material/MoreVert';

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
    <Box
      css={css`
        width: calc(${width}px - 0.5rem);
        position: relative;
        border: solid 1px #eee;
        transition: border-color 0.2s ease;
        margin-right: 0.5rem;

        &:hover {
          border-color: #11aaff;
          svg {
            opacity: 1;
          }
        }

        ${selected && `
          border-color: #11aaff;
          svg {
            opacity: 1;
          }
        `}
      `}
    >
      <Box 
        css={css`
          width: 100%;
          height: 1.625rem;
          white-space: nowrap;
          overflow: hidden;
          padding: 1px 0 2px;
        `}
      >
        {lyric}
      </Box>
      <MoreVert
        css={css`
          width: 1rem;
          height: 100%;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color: #fff;
          background-color: #11aaff;
          opacity: 0;
          transition: opacity 0.2s ease;
        `}
        onClick={(e) => handleClick(e, id)}
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
      />
    </Box>
  )
}

export default WriteEditMode
