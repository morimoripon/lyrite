import React, { useState } from 'react'
import { AppBar, Button, createTheme, IconButton, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { HeaderToolbarWrap } from '../../styles/components/Header'
import { ActionButton, ButtonForIcon, SignOutButton } from '../../styles/components/Button'
import { Bar } from './App'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { css } from "@emotion/react";
import { MailAddress, TitleLogo } from '../../styles/components/Text'


type Props = {
  user: any,
  signOut: any,
  save: any,
  open: boolean,
  openSideBar: Function
}

const Header = ({ user, signOut, save, open, openSideBar }: Props) => {
  const [ anchorElem, setAnchorElem ] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorElem);

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
        <Toolbar variant="dense">
          <Button
            css={css`
              width: 1.5rem;
              min-width: auto;
              padding: 0;
              margin-right: 1rem;
              opacity: 1;
              transition: width 0.2s ease, opacity 0.2s ease;
              overflow: hidden;

              @media screen and (min-width: 961px) {
                ${open && `
                  width: 0;
                  opacity: 0;
                `};
              }
            `} 
          >
            <DehazeIcon color='info' onClick={handleClickSideBarButton} />
          </Button>
          <Typography css={TitleLogo} variant="h6" component="h1">LYRITE</Typography>
        </Toolbar>

        <Toolbar variant="dense">
          <Typography css={MailAddress} component="div" onClick={handleClickEmail}>{user?.attributes?.email}</Typography>
          {/* <Button css={SignOutButton} color='info' variant='outlined' onClick={signOut}>サインアウト</Button> */}
          <Menu
            id="basic-menu"
            anchorEl={anchorElem}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={signOut}>サインアウト</MenuItem>
          </Menu>
        </Toolbar>
      </Box>
    </Bar>
  );
}

export default Header
