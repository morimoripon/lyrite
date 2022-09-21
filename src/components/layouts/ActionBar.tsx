import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { ActionButton } from '../../styles/components/Button';
import styled from '@emotion/styled';
import ColumnChangeSection from './ColumnChangeSection';
import { ActionBarContainer } from '../../styles/components/Container';
import { LyricColumn } from '../../types/type';

type Props = {
  lyricColumn: LyricColumn,
  editMode: boolean,
  setLyricColumn: Function,
  toggleEditMode: Function,
  save: Function
}

const ActionBar = ({ lyricColumn, editMode, setLyricColumn, toggleEditMode, save }: Props) => {

  const onClickModeButton = () => {
    toggleEditMode();
  }

  const onClickSaveButton = () => {
    save();
  }

  return (
    <Box css={ActionBarContainer}>
      <ColumnChangeSection
        lyricColumn={lyricColumn}
        setLyricColumn={setLyricColumn}
      />
      {editMode ? (
        <Button css={ActionButton} color='secondary' variant='contained' onClick={onClickModeButton}>入力モード</Button>
      ) : (
        <Button css={ActionButton} color='secondary' variant='outlined' onClick={onClickModeButton}>編集モード</Button>
      )}
      <Button css={ActionButton} color='secondary' variant='contained' onClick={onClickSaveButton}>保存</Button>
    </Box>
  );
}

export default ActionBar
