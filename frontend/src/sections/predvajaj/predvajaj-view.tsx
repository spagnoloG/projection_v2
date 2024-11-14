import { useEffect, useReducer, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FetchLyricById, FetchAppState, PostPlayedSong } from 'src/services/apiService';
import {
  connectSocket,
  disconnectSocket,
  onCurrentState,
  onRefreshDisplay,
  onSwipeLeft,
  onSwipeRight,
  onStop,
  onSetLyric,
  getCurrentStateAction,
} from 'src/services/socketService';
import type { AppState } from 'src/types';

interface State {
  chorusContent: string;
  kiticas: string[];
  currentIndex: number;
  lyricIndex: string;
}

type Action =
  | { type: 'SET_LYRIC'; chorusContent: string; kiticas: string[]; lyricIndex: string }
  | { type: 'SWIPE_LEFT' }
  | { type: 'SWIPE_RIGHT' }
  | { type: 'RESET' }
  | { type: 'SET_INDEX'; index: number }
  | { type: 'SET_LYRIC_INDEX'; index: number };

const initialState: State = {
  chorusContent: '',
  kiticas: [],
  currentIndex: 0,
  lyricIndex: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LYRIC':
      return {
        ...state,
        chorusContent: action.chorusContent,
        kiticas: action.kiticas,
        currentIndex: 0,
        lyricIndex: action.lyricIndex,
      };
    case 'SWIPE_LEFT':
      return {
        ...state,
        currentIndex:
          state.currentIndex > 0 ? state.currentIndex - 1 : state.kiticas.length * 2 - 1,
      };
    case 'SWIPE_RIGHT':
      return {
        ...state,
        currentIndex:
          state.currentIndex < state.kiticas.length * 2 - 1 ? state.currentIndex + 1 : 0,
      };
    case 'RESET':
      return initialState;
    case 'SET_INDEX':
      return { ...state, currentIndex: action.index };
    default:
      return state;
  }
}

export function PredvajajView() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [appState, setAppState] = useState<AppState | null>(null);

  useEffect(() => {
    const loadLyric = async (lyricId: string) => {
      try {
        const lyric = await FetchLyricById(lyricId);
        dispatch({
          type: 'SET_LYRIC',
          chorusContent: lyric.content.refren,
          kiticas: lyric.content.kitice,
          lyricIndex: lyricId,
        });
      } catch (error) {
        console.error('Failed to load lyric:', error);
        alert('Napaka pri nalaganju pesmi.');
      }
    };

    const loadAppState = async () => {
      try {
        const as = await FetchAppState();
        setAppState(as);
      } catch (error) {
        console.error('Failed to load app state:', error);
        alert('Napaka pri nalaganju nastavitev.');
      }
    };

    const logPlayedSong = async (lyricIndex: string) => {
      try {
        console.log('Posting played song');
        console.log('lyricIndex:', lyricIndex);
        await PostPlayedSong(parseInt(lyricIndex, 10));
      } catch (error) {
        console.error('Failed to post played song:', error);
        alert('Napaka pri pošiljanju igrane pesmi.');
      }
    };

    loadAppState();
    connectSocket();
    getCurrentStateAction();

    onCurrentState((s) => {
      if (s.currentLyric) {
        loadLyric(s.currentLyric);
      }
    });

    onRefreshDisplay(() => {
      window.location.reload();
    });

    onSwipeLeft(() => {
      dispatch({ type: 'SWIPE_LEFT' });
    });

    onSwipeRight(() => {
      console.log('swipe right');
      dispatch({ type: 'SWIPE_RIGHT' });
    });

    onStop(() => {
      dispatch({ type: 'RESET' });
    });

    onSetLyric(async (socket_state) => {
      await loadLyric(socket_state.currentLyric);
      await logPlayedSong(socket_state.currentLyric);
    });

    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const carouselItems = state.kiticas.flatMap((kitica) => [
    kitica.toUpperCase(),
    state.chorusContent.toUpperCase(),
  ]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      dispatch({ type: 'SWIPE_LEFT' });
    } else if (event.key === 'ArrowRight') {
      dispatch({ type: 'SWIPE_RIGHT' });
    }
  };

  const marginLeft = appState?.marginLeft || 0;
  const marginRight = appState?.marginRight || 0;
  const fontSize = 50;

  return (
    <Box
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Lyric viewer with keyboard navigation"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        p={2}
        minHeight="200px"
        mx="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginLeft: `${marginLeft}px`,
          marginRight: `${marginRight}px`,
          fontSize: `${fontSize}px`,
          maxWidth: `calc(100% - ${marginLeft + marginRight}px)`,
        }}
      >
        {carouselItems.length > 0 ? (
          <Typography
            variant="body1"
            component="div"
            mt={2}
            align="center"
            sx={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: carouselItems[state.currentIndex] }}
          />
        ) : (
          <Typography variant="body1" align="center">
            No lyric selected.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
