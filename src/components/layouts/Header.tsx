import React from 'react'
import { AppBar, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { HeaderToolbarWrap } from '../../styles/components/Header'
import { SignOutButton } from '../../styles/components/Button'
import { Bar } from '../../App'


type Props = {
  user: any,
  signOut: any,
  save: any,
  open: boolean
}

const Header = ({ user, signOut, save, open }: Props) => {

  console.log('user', user);

  return (
    <Bar position="fixed" open={open}>
      <Box css={HeaderToolbarWrap}>
        <Toolbar variant="dense">
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
