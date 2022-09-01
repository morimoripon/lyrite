import React from 'react'
import { AppBar, Button, createTheme, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { HeaderToolbarWrap } from '../../styles/components/Header'
import { SignOutButton } from '../../styles/components/Button'
import { drawerWidth } from '../../App'

type Props = {
  open: boolean,
  songs: any,
  currentId: any
  onChoose: Function
}

const SideBar = ({ open, songs, currentId, onChoose }: Props) => {

  console.log('songs', songs)

  return (
    <Drawer variant="persistent" anchor="left" open={open}
      sx={{
        width: `${drawerWidth}px`,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: `${drawerWidth}px`,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {songs.map((song: any) => (
          <ListItem color='secondary' key={song.id} selected={song.id === currentId} onClick={() => onChoose(song.id)}>
            <ListItemText primary={song.title ? song.title : '無題'} />
          </ListItem>
        ))}
        {/* <ListItem>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="About" secondary="hogehoge" />
        </ListItem> */}
      </List>
    </Drawer>
  );
}

export default SideBar
