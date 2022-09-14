import React, { createContext, useEffect, useState } from 'react'
import { AppBar, AppBarProps, Button, createTheme, IconButton, Input, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import WriteArea from './components/layouts/WriteArea'
import { ActionBar, Contents, WriteAreaBox } from './styles/components/Box'
import { Page } from './styles/components/Page'
import '@aws-amplify/ui-react/styles.css';
import Header from './components/layouts/Header'

import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { createSong, deleteSong, updateSong } from './graphql/mutations';
import { listSongs } from './graphql/queries';
import { onCreateSong, onDeleteSong, onUpdateSong } from './graphql/subscriptions'
import Title from './components/layouts/Title'
import { ActionButton, SignOutButton } from './styles/components/Button'
import SideBar from './components/layouts/SideBar'
import styled from '@emotion/styled'
import { OnCreateSongSubscription, OnCreateSongSubscriptionVariables } from './types/API'
import { LyricType, MoreCurrentId } from './types/type'


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

export const UserContext = createContext<any>(null);
export const SongsContext = createContext<any>(null);

export const drawerWidth = '240';

interface BarProps extends AppBarProps {
  open?: boolean;
}

export const NO_TITLE = '(no title)';

export const Bar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const PageContents = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<any>(({ theme, open }) => ({
  width: '100%',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


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
  const [ lyricColumn, setLyricColumn ] = useState<string>('3');
  const [ lyricColumnSizeList, setLyricColumnSizeList ] = useState<string[]>(['200', '200', '200']);
  

  const save = async (callback?: Function) => {
    const song = { title, lyrics: stringifyLyrics(lyrics) };
    if (id) {
      try {
        await API.graphql(graphqlOperation(updateSong, { input: { ...song, id }}));
      } catch (e) {
        alert('データ更新ができませんでした。')
        return;
      }
      console.log('更新しました')
    } else {
      try {
        await API.graphql(graphqlOperation(createSong, { input: song }));
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
    const song = { title: '', lyrics: '' };
    try {
      await API.graphql(graphqlOperation(createSong, { input: song }));
      console.log('作成しました')
    } catch (e) {
      alert('データ更新ができませんでした。')
      return;
    }
  }

  const reflectData = (updatedSong: any) => {
    let isCreate;
    setSongs((prevState: any) => {
      const targetIndex = prevState.findIndex((song: any) => song?.id === updatedSong.id);
      isCreate = targetIndex === -1;
      if (!isCreate) {
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
    if (isCreate) {
      setSongInfo(updatedSong);
    }
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
        return [ ...prevState ];
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

  const handleColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
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

  useEffect(() => {
    const getData = async () => {
      let songData;
      try {
        songData = await API.graphql(graphqlOperation(listSongs)) as GraphQLResult<any>;
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
        const { lyrics, title, id } = items[0];
        setTitle(title);
        setLyrics(parseLyrics(lyrics));
        setId(id);
      }
      setReadyToWrite(true);
    }

    getData();

    const subscriptionUpdate = API.graphql(graphqlOperation(onUpdateSong)) as any/* Observable<object> */;
    subscriptionUpdate.subscribe({
      next: ({ provider, value }: { provider: any, value: any }/* OnCreateSongSubscriptionVariables */) => {
        const updatedSong = value.data.onUpdateSong;
        reflectData(updatedSong);
      },
      error: (e: any) => {
        console.log(e.error.errors[0].message)
      }
    });

    const subscriptionCreate = API.graphql(graphqlOperation(onCreateSong)) as any/* Observable<object> */;
    subscriptionCreate.subscribe({
      next: ({ provider, value }: { provider: any, value: any }/* OnCreateSongSubscriptionVariables */) => {
        const createdSong = value.data.onCreateSong;
        reflectData(createdSong);
      },
      error: (e: any) => {
        console.log(e.error.errors[0].message)
      }
    });

    const subscriptionDelete = API.graphql(graphqlOperation(onDeleteSong)) as any/* Observable<object> */;
    subscriptionDelete.subscribe({
      next: ({ provider, value }: { provider: any, value: any }/* OnCreateSongSubscriptionVariables */) => {
        const DeletedSong = value.data.onDeleteSong;
        reflectDeleteData(DeletedSong);
      },
      error: (e: any) => {
        console.log(e.error.errors[0].message)
      }
    });
      
    
    /* return () => {
      subscriptionUpdate.unsubscribe();
      subscriptionCreate.unsubscribe();
    } */
  }, []);

  useEffect(() => {
    if (timeId) clearTimeout(timeId);
    if (!readyToWrite) return;

    timeId = setTimeout(() => {
      save();
    }, AUTOSAVE_TIME);
    
  }, [ title, lyrics ])

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <SongsContext.Provider value={songs}>
          <Box css={Page}>
            <Header user={user} signOut={signOut} save={save} open={sideBarOpened} openSideBar={openSideBar} />
            <SideBar open={sideBarOpened} songs={songs} currentId={id} choose={chooseSong} create={createNewSong} deleteWithConfirm={deleteWithConfirm} closeSideBar={closeSideBar} />
            <PageContents open={sideBarOpened}>
              <Box css={Contents}>
                <Box css={ActionBar}>
                  <Button css={ActionButton} color='secondary' variant='contained' onClick={() => save()}>保存</Button>
                  <Button css={ActionButton} color='secondary' variant='outlined' onClick={toggleEditMode}>編集モード</Button>
                  <Input type='number' onChange={handleColumnChange} value={lyricColumn} />
                  <Input type='number' onChange={(e) => handleColumnSizeChange(e, 0)} value={lyricColumnSizeList[0]} />
                  <Input type='number' onChange={(e) => handleColumnSizeChange(e, 1)} value={lyricColumnSizeList[1]} />
                  <Input type='number' onChange={(e) => handleColumnSizeChange(e, 2)} value={lyricColumnSizeList[2]} />
                </Box>
                <Box css={WriteAreaBox}>
                  <Title title={title} setTitle={setTitle}/>
                  <WriteArea lyrics={lyrics} lyricColumn={lyricColumn} lyricColumnSizeList={lyricColumnSizeList} editMode={editMode} setLyrics={setLyrics} addSentence={addSentence}/>
                </Box>
              </Box>
            </PageContents>
          </Box>
        </SongsContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
