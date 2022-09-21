import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Menu, MenuItem, Modal, TextField } from '@mui/material';
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

const MIN = 1;
const MAX = 10;

const isValid = (value: string) => {
  const num = Number(value);
  console.log('num', num)
  if (isNaN(num)) return false;
  if (MIN <= num && num <= MAX) {
    return true;
  } else {
    return false;
  }
}

const ColumnChangeModal = ({ open, lyricColumn, setOpen, setLyricColumn }: Props) => {
  const [ column, setColumn ] = useState(lyricColumn);
  const [ valid, setValid ] = useState(true);

  const handleChangeColumn = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    setColumn(e.target.value);
  }

  const handleBlur = () => {
    setValid(isValid(column));
  }

  const handleClickDoneButton = () => {
    if (valid) {
      setLyricColumn(column);
      setOpen(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
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
        <TextField css={ModalInput} type='number' onChange={handleChangeColumn} value={column} inputProps={{ min: 1, max: 10 }} variant="standard" onBlur={handleBlur} error={!valid} helperText="1〜10の間で入力して下さい" />
      </DialogContent>
      <DialogActions css={FlexHoriz}>
        <Button css={ModalButton} color='secondary' variant='contained' onClick={handleClickDoneButton}>設定</Button>
        <Button css={ModalButton} color='secondary' variant='outlined' onClick={handleClose}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ColumnChangeModal