import React, { createContext, useEffect, useState } from 'react'
import { AppBar, AppBarProps, Button, createTheme, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import WriteArea from './components/layouts/WriteArea'
import { ActionBar, Contents, WriteAreaBox, WriteInputBox } from './styles/components/Box'
import { Page } from './styles/components/Page'

import { Amplify } from "aws-amplify";
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import Header from './components/layouts/Header'

import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import { createSong, updateSong } from './graphql/mutations';
import { listSongs } from './graphql/queries';
import { onCreateSong, onUpdateSong } from './graphql/subscriptions'
import Title from './components/layouts/Title'
import { ActionButton, SignOutButton } from './styles/components/Button'
import SideBar from './components/layouts/SideBar'
import styled from '@emotion/styled'

// Amplifyの設定を行う
Amplify.configure(awsExports);

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
  const [ lyrics, setLyrics ] = useState<string[]>(['', '', '', '', '', '']);
  const [ id, setId ] = useState<string | null>(null);
  /* const [ timeId, setTimeId ] = useState<any>(null); */
  const [ readyToWrite, setReadyToWrite ] = useState<boolean>(false);
  const [ sideBarOpened, setSideBarOpened ] = useState<boolean>(false);

  const save = async (callback?: Function) => {
    const song = { title, lyrics: stringifyLyrics(lyrics) };
    if (id) {
      await API.graphql(graphqlOperation(updateSong, { input: { ...song, id }}));
    } else {
      await API.graphql(graphqlOperation(createSong, { input: song }));
    }
    if (callback) callback();
  }

  const stringifyLyrics = (lyrics: string[]): string => {
    return lyrics.join('\n');
  }

  const parseLyrics = (lyrics: string): string[] => {
    return lyrics.split('\n');
  }

  const toggleSideBar = () => {
    setSideBarOpened(!sideBarOpened);
  };

  const chooseSong = (id: any) => {
    const targetSong = songs.find((song) => song.id === id);
    if (targetSong) {
      save(() => {
        setId(targetSong.id);
        setTitle(targetSong.title);
        setLyrics(parseLyrics(targetSong.lyrics));
      });
    }
  }

  useEffect(() => {
    const getData = async () => {
      const songData = await API.graphql(graphqlOperation(listSongs)) as GraphQLResult<any>;
      setSongs(songData?.data?.listSongs?.items);
      console.log(songData)
      const { lyrics, title, id } = songData?.data?.listSongs?.items[0];
      if (lyrics) {
        setTitle(title);
        setLyrics(parseLyrics(lyrics));
        setId(id);
      }
      setReadyToWrite(true);
    }

    getData();

    /* const subscription = API.graphql(graphqlOperation(onCreateSong)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateSong;
        dispatch({ type: CREATE, todo });
      }
    });
    
    return () => subscription.unsubscribe(); */
  }, []);

  useEffect(() => {
    if (timeId) clearTimeout(timeId);
    if (!readyToWrite) return;

    timeId = setTimeout(() => {
      save();
    }, AUTOSAVE_TIME);
    
  }, [ title, lyrics ])

  console.log('songs', songs)

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={user}>
        <SongsContext.Provider value={songs}>
          <Box css={Page}>
            <Header user={user} signOut={signOut} save={save} open={sideBarOpened} />
            <SideBar open={sideBarOpened} songs={songs} currentId={id} onChoose={chooseSong} />
            <PageContents open={sideBarOpened}>
              <Box css={Contents}>
                <Box css={ActionBar}>
                  <Button css={ActionButton} color='secondary' variant='contained' onClick={() => save()}>保存</Button>
                  <Button css={ActionButton} color='secondary' variant='outlined' onClick={toggleSideBar}>サイドバー</Button>
                </Box>
                <Box css={WriteAreaBox}>
                  <Title title={title} setTitle={setTitle}/>
                  <WriteArea lyrics={lyrics} setLyrics={setLyrics}/>
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
