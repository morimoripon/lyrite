import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Menu, MenuItem, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { FlexHoriz, FlexVert } from '../../styles/components/Box';
import { AddSentenceButton, ModalButton } from '../../styles/components/Button';
import { ModalInput } from '../../styles/components/Input';

type Props = {
  open: boolean,
  lyricColumn: string,
  setOpen: Function,
  setLyricColumn: Function,
}

const ColumnChangeModal = ({ open, lyricColumn, setOpen, setLyricColumn }: Props) => {
  const [ column, setColumn ] = useState(lyricColumn);

  const handleChangeColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    console.log(e)
    setColumn(e.target.value);
  }

  const handleClickDoneButton = () => {
    setLyricColumn(column);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      console.log('on dialog open')
      setColumn(lyricColumn);
    }
  }, [ open ])

  if (!open) return null;

  return ( 
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle css={FlexVert}>列数を変更</DialogTitle>
      <DialogContent css={FlexVert}>
        <Input css={ModalInput} type='number' onChange={handleChangeColumn} value={column} inputProps={{ min: 1, max: 10 }} />
      </DialogContent>
      <DialogActions css={FlexHoriz}>
        <Button css={ModalButton} color='secondary' variant='contained' onClick={handleClickDoneButton}>設定</Button>
        <Button css={ModalButton} color='secondary' variant='outlined' onClick={handleClose}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ColumnChangeModal