import React from 'react'
import { AppBar, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { HeaderToolbarWrap } from '../../styles/components/Header'
import { ActionButton, ButtonForIcon, SignOutButton } from '../../styles/components/Button'
import { Bar } from '../../App'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { css } from "@emotion/react";


type Props = {
  user: any,
  signOut: any,
  save: any,
  open: boolean,
  openSideBar: Function
}

const Header = ({ user, signOut, save, open, openSideBar }: Props) => {

  const handleClickSideBarButton = () => {
    openSideBar();
  }

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

              ${open && `
                width: 0;
                opacity: 0;
              `};
            `} 
          >
            <DehazeIcon color='info' onClick={handleClickSideBarButton} />
          </Button>
          <Typography variant="h6" component="h1">LYRITE</Typography>
        </Toolbar>

        <Toolbar variant="dense">
          <Typography component="div">{user?.attributes?.email}</Typography>
          <Button css={SignOutButton} color='info' variant='outlined' onClick={signOut}>サインアウト</Button>
        </Toolbar>
      </Box>
    </Bar>
  );
}

export default Header
