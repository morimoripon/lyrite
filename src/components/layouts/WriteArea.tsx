import { Button, Input, Menu, MenuItem, Slider } from '@mui/material';
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import { SliderBox, SongInfoBox, WriteAreaBox, WriteInputContainer } from '../../styles/components/Box'
import { AddButton, AddSentenceButton } from '../../styles/components/Button';
import WriteInput from '../elements/WriteInput';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ListManager } from "react-beautiful-dnd-grid";
import type {
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import { LyricType, MenuCurrentId } from '../../types/type';
import WriteEditMode from '../elements/WriteEditMode';
import { css } from "@emotion/react";
import ColumnChangeSection from './ColumnChangeSection';
import { SliderStyle } from '../../styles/components/Input';

type Props = {
  lyrics: LyricType[],
  lyricColumn: string,
  lyricColumnSizeList: string[],
  editMode: boolean,
  setLyrics: Function,
  setLyricColumn: Function,
  setLyricColumnSizeList: Function
  addSentence: Function
}

// ドラッグ&ドロップした要素を入れ替える
const reorder = (
  list: LyricType[],
  startIndex: number,
  endIndex: number
): LyricType[] => {
  console.log('reorder')
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const WriteArea = ({ lyrics, lyricColumn, lyricColumnSizeList, editMode, setLyrics, setLyricColumn, setLyricColumnSizeList, addSentence }: Props) => {
  const [anchorElem, setAnchorElem] = useState<HTMLElement | null>(null);
  const [menuCurrentId, setMenuCurrentId] = useState<MenuCurrentId>(null);
  const menuOpen = Boolean(anchorElem);


  const setMenuTarget = (target: any, id: MenuCurrentId) => {
    setAnchorElem(target);
    setMenuCurrentId(id);
  };

  const clearMenu = () => {
    setAnchorElem(null);
    setMenuCurrentId(null);
  }

  const handleMenuClose = () => {
    clearMenu();
  };

  const handleDelete = async () => {
    if (lyrics.length <= 1) {
      setLyrics([
        { content: '', id: 1 }
      ]);
    } else {
      const targetIndex = lyrics.findIndex(lyric => lyric.id === menuCurrentId);
      if (targetIndex === -1) return;
      setLyrics([
        ...lyrics.slice(0, targetIndex),
        ...lyrics.slice(targetIndex + 1)
      ]);
    }
    clearMenu();
  }

  const changeLyrics = (index: number, newLyric: string, id: number) => {
    setLyrics([
      ...lyrics.slice(0, index),
      { content: newLyric, id },
      ...lyrics.slice(index + 1)
    ]);
  };

  const onDragEnd = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return;
    let movedItems = reorder(
      lyrics, //　順序を入れ変えたい配列
      sourceIndex, // 元の配列の位置
      destinationIndex // 移動先の配列の位置
    );
    setLyrics(movedItems);
  };

  const column = Number(lyricColumn) || 3;

  const getWidth = (index: number) => {
    if (index === -1) return 200;
    const targetColumn = index % column;
    return Number(lyricColumnSizeList[targetColumn]) || 200;
  }

  const getIndex = (id: number) => {
    return lyrics.findIndex(lyric => lyric.id === id);
  }

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    console.log(e)
    setLyricColumn(e.target.value);
  }

  const handleColumnSizeChange = (e: any, index: number) => {
    if (!e.target) return;
    setLyricColumnSizeList([
      ...lyricColumnSizeList.slice(0, index),
      e.target.value,
      ...lyricColumnSizeList.slice(index + 1)
    ]);
  }

  const gridColumnTemplateValue = window.matchMedia('(max-width: 960px)').matches ? (
    lyricColumnSizeList.map(size => `${Math.floor(Number(size) * 0.75)}px`).join(' ')
  ) : (
    lyricColumnSizeList.map(size => `${size}px`).join(' ')
  ) 

  return ( 
    <Box css={WriteInputContainer}>
      {editMode ? (
        <>
          <ListManager
            items={lyrics}
            direction="horizontal"
            maxItems={column}
            render={(lyric) => {
              const index = getIndex(lyric.id);
              const width = getWidth(index);
              return <WriteEditMode key={index} lyric={lyric.content} width={width} id={lyric.id} menuOpen={menuOpen} selected={lyric.id === menuCurrentId} setMenuTarget={setMenuTarget} />
            }}
            onDragEnd={onDragEnd}
          />
          <Menu
            id="write-menu"
            anchorEl={anchorElem}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleDelete}>削除</MenuItem>
          </Menu>
        </>
      ) : (
        <Box 
          css={css`
            display: grid;
            grid-template-columns: ${gridColumnTemplateValue};
            grid-template-rows: auto;
          `}
        >
          {lyrics.map((lyric, index) => {
            const width = getWidth(index);
            return <WriteInput key={index} lyric={lyric.content} editMode={editMode} width={width} changeLyrics={(value: any) => changeLyrics(index, value, lyric.id)} />
          })}
          <Button key='addButton' css={AddSentenceButton} color='secondary' variant='outlined' onClick={() => addSentence()}>+</Button>
         </Box>
      )}
      <Box css={SongInfoBox}>
        <Box 
          css={css`
            display: grid;
            grid-template-columns: ${gridColumnTemplateValue};
            grid-template-rows: auto;
          `}
        >
          {lyricColumnSizeList.map((size, index) => (
            <Box key={index} css={SliderBox}>
              {/* <Input type='number' onChange={(e) => handleColumnSizeChange(e, index)} value={size} inputProps={{ min: 50, max: 1000 }} /> */}
              <Slider color='secondary' css={SliderStyle} min={80} max={800} onChange={(e) => handleColumnSizeChange(e, index)} value={Number(size)} aria-label="Default" valueLabelDisplay="auto" />
            </Box>
          ))}
        </Box>
        <ColumnChangeSection
          lyricColumn={lyricColumn}
          setLyricColumn={setLyricColumn}
        />
      </Box>
    </Box>
  );
}

export default WriteArea