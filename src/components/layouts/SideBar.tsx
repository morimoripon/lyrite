import React, { useState } from 'react'
import { AppBar, Button, createTheme, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { HeaderToolbarWrap } from '../../styles/components/Header'
import { ActionButton, AddButton, SignOutButton } from '../../styles/components/Button'
import { drawerWidth, NO_TITLE } from '../../App'
import { SideBarListItem } from '../../styles/components/List'
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { Ellipsis } from '../../styles/components/Text'
import { MoreCurrentId } from '../../types/type'
import { css } from "@emotion/react";


type Props = {
  open: boolean,
  songs: any,
  currentId: any
  choose: Function,
  create: any,
  deleteWithConfirm: Function
}

const SideBar = ({ open, songs, currentId, choose, create, deleteWithConfirm }: Props) => {
  const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null);
  const [moreCurrentId, setMoreCurrentId] = useState<MoreCurrentId>(null);
  const menuOpen = Boolean(anchorElem);


  const handleMoreIcon = (e: any, id: MoreCurrentId) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorElem(e.currentTarget);
    setMoreCurrentId(id);
    console.log('more')
  };

  const clearMenu = () => {
    setAnchorElem(null);
    setMoreCurrentId(null);
  }

  const handleMenuClose = () => {
    clearMenu()
  };

  const handleDelete = async () => {
    const deleted = await deleteWithConfirm(moreCurrentId);
    console.log('deleted', deleted)
    if (deleted) {
      clearMenu()
    }
  }

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
      <Box>
        <List>
          {songs.map(({ id, title }: any) => (
            <ListItem 
              css={SideBarListItem}
              color='secondary'
              key={id}
              selected={id === currentId}
              onClick={() => choose(id)}
              aria-controls={menuOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuOpen ? 'true' : undefined}
            >
              <ListItemText disableTypography css={Ellipsis} primary={title || NO_TITLE} />
              <MoreHoriz 
                css={css`
                  opacity: ${id === moreCurrentId ? '1' : '0.2'};
                  transition: opacity 0.2s ease;
                  &:hover {
                    opacity: 1;
                  }
                `} 
                color='primary' 
                onClick={(e) => handleMoreIcon(e, id)} 
              />
            </ListItem>
          ))}
        </List>
        <Button css={AddButton} color='secondary' variant='text' onClick={create}>+</Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorElem}
          open={menuOpen}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleDelete}>削除</MenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
}

export default SideBar
