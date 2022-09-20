import React, { createContext, useEffect, useState } from 'react'
import { AppBar, AppBarProps, Button, createTheme, IconButton, Input, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import WriteArea from './WriteArea'
import { ActionBar, Contents, WriteAreaBox } from '../../styles/components/Box'
import { Page } from '../../styles/components/Page'
import '@aws-amplify/ui-react/styles.css';
import Header from './Header'

import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { createSong, deleteSong, updateSong } from '../../graphql/mutations';
import { listSongs } from '../../graphql/queries';
import { onCreateSong, onDeleteSong, onUpdateSong } from '../../graphql/subscriptions'
import Title from './Title'
import { ActionButton, SignOutButton } from '../../styles/components/Button'
import SideBar from './SideBar'
import styled from '@emotion/styled'
import { OnCreateSongSubscription, OnCreateSongSubscriptionVariables } from '../../types/API'
import { LyricType, MoreCurrentId } from '../../types/type'
import ColumnChangeSection from './ColumnChangeSection'
import useSaveDone from '../../hooks/SaveDone'


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000055',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#11aaff',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9933',
      contrastText: '#ffffff',
    },
    info: {
      main: '#ffffff',
      contrastText: '#000055',
    }
  } 
})

type Props = {
  user: any/* CognitoUserAmplify */,
  signOut: any/* AuthEventData */,
}

const AUTOSAVE_TIME = 3000;

let timeId: any = null;

/* export const LyricColumnSizeListContext = createContext(
  {} as {
    lyricColumnSizeList: string[]
    setLyricColumnSizeList: React.Dispatch<React.SetStateAction<string[]>>
  }
); */

export const drawerWidth = '240';
export const NO_TITLE = '(no title)';

const withSideBarAnimation = (component: any) => {
  console.log('window.matchMedia', window.matchMedia('(max-width: 960px)'))
  return styled(component, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<any>(({ theme, open }) => ({
    width: '100%',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && window.matchMedia('(min-width: 961px)').matches && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
}

export const Bar = withSideBarAnimation(AppBar);

const PageContents = withSideBarAnimation(Box);

const defaultLyricColumn = 3;
const defaultLyricColumnSize = '200';
const defaultLyricColumnSizeList = new Array(defaultLyricColumn).fill(defaultLyricColumnSize);

const App = ({ user, signOut }: Props) => {
  const [ songs, setSongs ] = useState<any[]>([]);
  const [ title, setTitle ] = useState<string>('');
  const [ lyrics, setLyrics ] = useState<LyricType[]>([
    { content: '', id: 1 },
    { content: '', id: 2 },
    { content: '', id: 3 },
    { content: '', id: 4 },
    { content: '', id: 5 },
    { content: '', id: 6 }
  ]);
  const [ id, setId ] = useState<string | null>(null);
  const [ readyToWrite, setReadyToWrite ] = useState<boolean>(false);
  const [ sideBarOpened, setSideBarOpened ] = useState<boolean>(false);
  const [ editMode, setEditMode ] = useState<boolean>(false);
  const [ lyricColumn, setLyricColumn ] = useState<string>(String(defaultLyricColumn));
  const [ lyricColumnSizeList, setLyricColumnSizeList ] = useState<string[]>(defaultLyricColumnSizeList);
  const [ hasSaved, onSaved ] = useSaveDone(false);
  
  const save = async (callback?: Function) => {
    const song = { 
      title, 
      lyrics: stringifyLyrics(lyrics),
      columns: Number(lyricColumn) || defaultLyricColumn,
      columnWidths: lyricColumnSizeList.join('\n') || defaultLyricColumnSizeList.join('\n')
    };
    if (id) {
      try {
        await API.graphql(graphqlOperation(updateSong, { input: { ...song, id }}));
        onSaved();
      } catch (e) {
        alert('データ更新ができませんでした。')
        return;
      }
      console.log('更新しました')
    } else {
      try {
        await API.graphql(graphqlOperation(createSong, { input: { ...song, username: user.username } }));
        onSaved();
      } catch (e) {
        alert('データ更新ができませんでした。')
        return;
      }
      console.log('作成しました')
    }
    if (callback) callback();
  }

  const stringifyLyrics = (lyrics: LyricType[]): string => {
    return lyrics.map(lyric => lyric.content).join('\n');
  }

  const parseLyrics = (lyrics: string): LyricType[] => {
    return lyrics.split('\n').map((lyric, index) => ({ content: lyric, id: index + 1 }));
  }

  const openSideBar = () => {
    setSideBarOpened(true);
  }

  const closeSideBar = () => {
    setSideBarOpened(false);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const setSongInfo = (song: any) => {
    setId(song.id);
    setTitle(song.title);
    setLyrics(parseLyrics(song.lyrics));
    setLyricColumn(String(song.columns));
    setLyricColumnSizeList(song.columnWidths.split('\n'));
  }

  const chooseSong = (id: any) => {
    const targetSong = songs.find((song) => song.id === id);
    if (targetSong) {
      clearTimeout(timeId);
      save(() => {
        setSongInfo(targetSong);
      });
    }
  }

  const createNewSong = async () => {
    const song = { 
      title: '', 
      lyrics: '',
      columns: defaultLyricColumn,
      columnWidths: defaultLyricColumnSizeList.join('\n')
    };
    try {
      await API.graphql(graphqlOperation(createSong, { input: { ...song, username: user.username } }));
    } catch (e) {
      alert('データ作成ができませんでした。')
      return;
    }
  }

  const reflectData = (updatedSong: any) => {
    setSongs((prevState: any) => {
      const targetIndex = prevState.findIndex((song: any) => song?.id === updatedSong.id);
      if (targetIndex !== -1) {
        return [
          ...prevState.slice(0, targetIndex),
          updatedSong,
          ...prevState.slice(targetIndex + 1)
        ];
      } else {
        return [
          updatedSong,
          ...prevState
        ];
      } 
    });
  }

  const reflectDeleteData = (deletedSong: any) => {
    setSongs((prevState: any) => {
      const targetIndex = prevState.findIndex((song: any) => song?.id === deletedSong.id);
      if (targetIndex !== -1) {
        return [
          ...prevState.slice(0, targetIndex),
          ...prevState.slice(targetIndex + 1)
        ];
      } else {
        return prevState;
      }
    });
  }

  const deleteWithConfirm = async (id: MoreCurrentId) => {
    const target = songs.find((song: any) => song?.id === id);
    if (!target) {
      alert('指定のデータが見つかりませんでした。既に削除されている可能性があります。');
    }
    if (window.confirm(`"${target.title || NO_TITLE}"を削除します。\nよろしいですか？`)) {
      await API.graphql(graphqlOperation(deleteSong, { input: { id }}));
      console.log('削除しました。')
      return true;
    } else {
      return false;
    }
  }

  const addSentence = () => {
    setLyrics([ ...lyrics, { content: '', id: lyrics.length + 1 } ]);
  };

  useEffect(() => {
    const userFilter = {
      username: {
        'eq': user.username
      }
    };

    const getData = async () => {
      let songData;
      try {
        songData = await API.graphql(graphqlOperation(listSongs, { filter: userFilter })) as GraphQLResult<any>;
        console.log('songData', songData)
      } catch (e) {
        alert('データを取得できませんでした。再読み込みを試してみてください。')
        return;
      }
      const { items } = songData?.data?.listSongs;
      if (!items || !Array.isArray(items)) {
        alert('データを取得できませんでした。再読み込みを試してみてください。')
        return;
      }
      setSongs(items);
      if (items.length) {
        setSongInfo(items[0]);
      }
      setReadyToWrite(true);
    }

    getData();

    const subscriptionUpdate = API.graphql(graphqlOperation(onUpdateSong, { filter: userFilter })) as any/* Observable<object> */;
    subscriptionUpdate.subscribe({
      next: ({ provider, value }: { provider: any, value: any }) => {
        const updatedSong = value.data.onUpdateSong;
        reflectData(updatedSong);
      },
      error: (e: any) => {
        console.log(e.error.errors[0].message)
      }
    });

    const subscriptionCreate = API.graphql(graphqlOperation(onCreateSong, { filter: userFilter })) as any/* Observable<object> */;
    subscriptionCreate.subscribe({
      next: ({ provider, value }: { provider: any, value: any }) => {
        const createdSong = value.data.onCreateSong;
        reflectData(createdSong);
        setSongInfo(createdSong);
      },
      error: (e: any) => {
        console.log(e.error.errors[0].message)
      }
    });

    const subscriptionDelete = API.graphql(graphqlOperation(onDeleteSong, { filter: userFilter })) as any/* Observable<object> */;
    subscriptionDelete.subscribe({
      next: ({ provider, value }: { provider: any, value: any }) => {
        const DeletedSong = value.data.onDeleteSong;
        reflectDeleteData(DeletedSong);
      },
      error: (e: any) => {
        console.log(e.error.errors[0].message)
      }
    });
      
    
    return () => {
      subscriptionUpdate.unsubscribe();
      subscriptionCreate.unsubscribe();
      subscriptionDelete.unsubscribe();
    }
  }, []);

  useEffect(() => {
    const columnAmount = Number(lyricColumn);
    if (columnAmount) {
      const listLength = lyricColumnSizeList.length;
      if (columnAmount < listLength) {
        setLyricColumnSizeList([ ...lyricColumnSizeList.slice(0, columnAmount) ]);
      } else if (columnAmount > listLength) {
        setLyricColumnSizeList([ ...lyricColumnSizeList, ...new Array(columnAmount - listLength).fill(defaultLyricColumnSize) ]);
      }
    }
    
  }, [ lyricColumn ]);

  useEffect(() => {
    if (!songs.find(song => song.id === id) && songs.length) {
      setSongInfo(songs[0]);
    }
  }, [ songs ]);

  useEffect(() => {
    if (timeId) clearTimeout(timeId);
    if (!readyToWrite) return;

    timeId = setTimeout(() => {
      save();
    }, AUTOSAVE_TIME);
    
  }, [ title, lyrics, lyricColumn, lyricColumnSizeList ]);

  return (
    <ThemeProvider theme={theme}>
      <Box css={Page}>
        <Header
          user={user}
          signOut={signOut}
          hasSaved={hasSaved}
          open={sideBarOpened}
          openSideBar={openSideBar}
        />
        <SideBar
          open={sideBarOpened}
          songs={songs}
          currentId={id}
          choose={chooseSong}
          create={createNewSong}
          deleteWithConfirm={deleteWithConfirm}
          closeSideBar={closeSideBar}
        />
        <PageContents
          open={sideBarOpened}
        >
          <Box css={Contents}>
            <Box css={ActionBar}>
              <ColumnChangeSection
                lyricColumn={lyricColumn}
                setLyricColumn={setLyricColumn}
              />
              {editMode ? (
                <Button css={ActionButton} color='secondary' variant='contained' onClick={toggleEditMode}>入力モード</Button>
              ) : (
                <Button css={ActionButton} color='secondary' variant='outlined' onClick={toggleEditMode}>編集モード</Button>
              )}
              <Button css={ActionButton} color='secondary' variant='contained' onClick={() => save()}>保存</Button>
            </Box>
            <Box css={WriteAreaBox}>
              <Title
                title={title}
                setTitle={setTitle}
              />

              {/* <LyricColumnSizeListContext.Provider value={{ lyricColumnSizeList, setLyricColumnSizeList }}> */}
              <WriteArea
                lyrics={lyrics}
                lyricColumn={lyricColumn}
                lyricColumnSizeList={lyricColumnSizeList}
                editMode={editMode}
                setLyricColumn={setLyricColumn}
                setLyricColumnSizeList={setLyricColumnSizeList}
                setLyrics={setLyrics}
                addSentence={addSentence}
              />
              {/* </LyricColumnSizeListContext.Provider> */}
            </Box>
          </Box>
        </PageContents>
      </Box>
    </ThemeProvider>
  )
}

export default App
