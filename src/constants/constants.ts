export const DRAWER_WIDTH = '240';
export const NO_TITLE = '(no title)';
export const AUTOSAVE_TIME = 3000;
export const DEFAULT_LYRIC_COLUMN = 3;
export const DEFAULT_LYRIC_COLUMN_SIZE = '200';
export const DEFAULT_LYRIC_COLUMN_SIZE_LIST = new Array(DEFAULT_LYRIC_COLUMN).fill(DEFAULT_LYRIC_COLUMN_SIZE);

export const EMPTY_SONG = {
  title: '',
  lyrics: [
    { content: '', id: 1 },
    { content: '', id: 2 },
    { content: '', id: 3 },
    { content: '', id: 4 },
    { content: '', id: 5 },
    { content: '', id: 6 }
  ],
  id: null,
  lyricColumn: DEFAULT_LYRIC_COLUMN,
  lyricColumnSizeList: DEFAULT_LYRIC_COLUMN_SIZE_LIST
}