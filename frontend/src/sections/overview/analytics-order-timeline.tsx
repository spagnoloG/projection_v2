import type { CardProps } from '@mui/material/Card';
import type { TimelineItemProps } from '@mui/lab/TimelineItem';

import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { connectSocket, setLyricAction } from 'src/services/socketService';

import type { Lyric } from 'src/types';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: Lyric[];
};

export function AnalyticsOrderTimeline({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <Item key={item._id} item={item} lastItem={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: Lyric;
};

function Item({ item, lastItem, ...other }: ItemProps) {
  const handlePlayClick = () => {
    connectSocket();
    setLyricAction({ currentLyric: item._id });
  };

  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
          {item.title}
          <IconButton onClick={handlePlayClick} aria-label="play">
            <PlayArrowIcon fontSize="small" />
          </IconButton>
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {item.categories.join(', ')} {/* Replace this with actual time if available */}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
