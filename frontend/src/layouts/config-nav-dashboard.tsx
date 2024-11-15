import LyricsIcon from '@mui/icons-material/Lyrics';
import CategoryIcon from '@mui/icons-material/Category';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'Domov',
    path: '/',
    icon: <AutoGraphIcon />,
  },
  {
    title: 'Pesmi',
    path: '/pesmi',
    icon: <LyricsIcon />,
  },
  {
    title: 'Kategorije',
    path: '/kategorije',
    icon: <CategoryIcon />,
  },
];
