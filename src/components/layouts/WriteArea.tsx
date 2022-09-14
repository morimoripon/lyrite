import { Button, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { WriteAreaBox, WriteInputContainer } from '../../styles/components/Box'
import { AddButton } from '../../styles/components/Button';
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

type Props = {
  lyrics: LyricType[],
  lyricColumn: string,
  lyricColumnSizeList: string[],
  editMode: boolean,
  setLyrics: Function,
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

const WriteArea = ({ lyrics, lyricColumn, lyricColumnSizeList, editMode, setLyrics, addSentence }: Props) => {
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
            grid-template-columns: ${lyricColumnSizeList.map(size => `${size}px`).join(' ')};
            grid-template-rows: auto;
          `}
        >
          {lyrics.map((lyric, index) => {
            const width = getWidth(index);
            return <WriteInput key={index} lyric={lyric.content} editMode={editMode} width={width} changeLyrics={(value: any) => changeLyrics(index, value, lyric.id)} />
          })}
         </Box>
      )}
      
      <Button css={AddButton} color='secondary' variant='outlined' onClick={() => addSentence()}>+</Button>
    </Box>
  );
}

export default WriteArea

/* return ( 
  <div>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <Box css={WriteInputBox}>
              {lyrics.map((lyric, index) => (
                <Draggable
                  key={`${lyric.id}`}
                  draggableId={`${lyric.id}`}
                  index={index}
                >
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <WriteInput key={index} lyric={lyric.content} editMode={editMode} changeLyrics={(value) => changeLyrics(index, value, lyric.id)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          </div>
        )}
      </Droppable>
    </DragDropContext>
    <Button css={AddButton} color='secondary' variant='outlined' onClick={() => addSentence()}>+</Button>
  </div>
); */