import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { FetchLyricById, FetchAppState } from 'src/services/apiService';
import type { AppState } from 'src/types';

export function PredvajajView() {
  const { id } = useParams<{ id: string }>();
  const [chorusContent, setChorusContent] = useState('');
  const [kiticas, setKiticas] = useState<string[]>([]);
  const [app_state, setAppState] = useState<AppState | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadLyric = async () => {
      if (!id) return;
      try {
        const lyric = await FetchLyricById(id);
        setChorusContent(lyric.content.refren);
        setKiticas(lyric.content.kitice);
      } catch (error) {
        console.error('Failed to load lyric:', error);
        alert('Napaka pri nalaganju pesmi.');
      }
    };
    const loadAppState = async () => {
      try {
        const appState = await FetchAppState();
        setAppState(appState);
      } catch (error) {
        console.error('Failed to load app state:', error);
        alert('Napaka pri nalaganju nastavitev.');
      }
    };
    loadLyric();
    loadAppState();
  }, [id]);

  const carouselItems = kiticas.flatMap((kitica) => [
    kitica.toUpperCase(),
    chorusContent.toUpperCase(),
  ]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : carouselItems.length - 1));
    } else if (event.key === 'ArrowRight') {
      setCurrentIndex((prevIndex) => (prevIndex < carouselItems.length - 1 ? prevIndex + 1 : 0));
    }
  };

  const marginLeft = app_state?.marginLeft || 0;
  const marginRight = app_state?.marginRight || 0;
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
        <Typography
          variant="body1"
          component="div"
          mt={2}
          align="center"
          sx={{ fontSize: `${fontSize}px`, lineHeight: 1.5 }}
          dangerouslySetInnerHTML={{ __html: carouselItems[currentIndex] }}
        />
      </Box>
    </Box>
  );
}
