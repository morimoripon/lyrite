import React, { useState } from 'react';
import { AppBar, Button, createTheme, Divider, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { CheckIcon, HeaderToolbar, HeaderToolbarWrap } from '../../styles/components/Header';
import { ActionButton, ButtonForIcon, SignOutButton } from '../../styles/components/Button';
import { Bar } from './App';
import { css } from "@emotion/react";
import { MailAddress, TitleLogo } from '../../styles/components/Text';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { MenuMailAddressBox, SaveSuccessBox } from '../../styles/components/Box';


type Props = {
  user: any,
  signOut: any,
  hasSaved: any,
  open: boolean,
  openSideBar: Function
}

const Header = ({ user, signOut, hasSaved, open, openSideBar }: Props) => {
  const [ anchorElem, setAnchorElem ] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorElem);
  const { email } = user?.attributes;

  const handleClickSideBarButton = () => {
    openSideBar();
  }

  const handleClickEmail = (e: any) => {
    e.preventDefault();
    setAnchorElem(e.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorElem(null);
  };

  return (
    <Bar position="fixed" open={open}>
      <Box css={HeaderToolbarWrap}>
        <Toolbar variant="dense" css={HeaderToolbar}>
          <Button
            css={css`
              width: 1.5rem;
              min-width: auto;
              padding: 0;
              margin-right: 0.5rem;
              opacity: 1;
              transition: width 0.2s ease, opacity 0.2s ease, margin 0.2s ease;
              overflow: hidden;

              @media screen and (min-width: 961px) {
                margin-right: 1rem;
                ${open && `
                  width: 0;
                  opacity: 0;
                  margin-right: 0;
                `};
              }
            `} 
          >
            <DehazeIcon color='info' onClick={handleClickSideBarButton} />
          </Button>
          <Typography css={TitleLogo} variant="h6" component="h1">LYRITE</Typography>
          {hasSaved && <Box css={SaveSuccessBox}><CheckCircleOutlineIcon color='info' css={CheckIcon} />保存しました</Box>}
        </Toolbar>
        <Toolbar variant="dense" css={HeaderToolbar}>
          <Typography css={MailAddress} component="div" onClick={handleClickEmail}>{email}</Typography>
          <Menu
            id="basic-menu"
            anchorEl={anchorElem}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Box css={MenuMailAddressBox}>{email}</Box>
            <Divider />
            <MenuItem onClick={signOut}>サインアウト</MenuItem>
          </Menu>
        </Toolbar>
      </Box>
    </Bar>
  );
}

export default Header
