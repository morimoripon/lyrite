import React, { useState } from 'react'
import { Button, createTheme, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, SwipeableDrawer, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { AddButton, SideBarCloseButton, SignOutButton } from '../../styles/components/Button'
import { SideBarListItem } from '../../styles/components/List'
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { Ellipsis } from '../../styles/components/Text'
import { MoreCurrentId } from '../../types/type'
import { css } from "@emotion/react";
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import { ArrowBackIcon, SideBarMoreIcon } from '../../styles/components/Icon'
import { SideBarHeadingBox } from '../../styles/components/Box'
import { SideBarContainer } from '../../styles/components/Container'
import { DRAWER_WIDTH, NO_TITLE } from '../../constants/constants'


type Props = {
  open: boolean,
  songs: any,
  currentId: any
  choose: Function,
  create: any,
  deleteWithConfirm: Function,
  closeSideBar: Function
}

const SideBar = ({ open, songs, currentId, choose, create, deleteWithConfirm, closeSideBar }: Props) => {
  const [ anchorElem, setAnchorElem ] = useState<HTMLElement | null>(null);
  const [ moreCurrentId, setMoreCurrentId ] = useState<MoreCurrentId>(null);
  const menuOpen = Boolean(anchorElem);

  const handleMoreIcon = (e: any, id: MoreCurrentId) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorElem(e.currentTarget);
    setMoreCurrentId(id);
  };

  const clearMenu = () => {
    setAnchorElem(null);
    setMoreCurrentId(null);
  }

  const handleMenuClose = () => {
    clearMenu();
  };

  const handleDelete = async () => {
    const deleted = await deleteWithConfirm(moreCurrentId);
    if (deleted) {
      clearMenu();
    }
  }

  const handleClickClose = () => {
    closeSideBar();
  }

  const sideBarVariant = window.matchMedia('(max-width: 960px)').matches ? 'temporary' : 'persistent';

  return (
    <Drawer variant={sideBarVariant} css={SideBarContainer(DRAWER_WIDTH)} anchor="left" open={open} onClose={handleClickClose}>
      <Box>
        <Box css={SideBarHeadingBox}>
          <Typography variant="subtitle1" component="h2">Songs</Typography>
          <Button color='secondary' css={SideBarCloseButton}>
            <ArrowBack css={ArrowBackIcon} onClick={handleClickClose} />
          </Button>
        </Box>
        <Divider />
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
              <MoreHoriz css={SideBarMoreIcon(id === moreCurrentId)} color='primary' onClick={(e) => handleMoreIcon(e, id)} />
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