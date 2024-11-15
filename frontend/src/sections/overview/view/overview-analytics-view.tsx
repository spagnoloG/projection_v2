import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import {
  Box,
  CardHeader,
  Card,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RefreshIcon from '@mui/icons-material/Refresh';

import { DashboardContent } from 'src/layouts/dashboard';
import { FetchPlayingStatistics, FetchLyrics, FetchLyricById } from 'src/services/apiService';
import {
  connectSocket,
  swipeLeftAction,
  swipeRightAction,
  stopAction,
  refreshDisplayAction,
  setLyricAction,
  onCurrentState,
  getCurrentStateAction,
} from 'src/services/socketService';
import type { TimeFrameStatistics, Lyric, SocketState } from 'src/types';

import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [monthlyStatistics, setMonthlyStatistics] = useState<TimeFrameStatistics | null>(null);
  const [dailyStatistics, setDailyStatistics] = useState<TimeFrameStatistics | null>(null);
  const [hourlyStatistics, setHourlyStatistics] = useState<TimeFrameStatistics | null>(null);
  const [topTenPlayedSongs, setTopTenPlayedSongs] = useState<any[]>([]);
  const [tenLatestPlayedSongs, setTenLatestPlayedSongs] = useState<any[]>([]);
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLyricTitle, setCurrentLyricTitle] = useState<string | null>(null);

  useEffect(() => {
    connectSocket();

    const fetchPlayingStatistics = async () => {
      try {
        const result = await FetchPlayingStatistics();
        setMonthlyStatistics(result.monthly);
        setDailyStatistics(result.daily);
        setHourlyStatistics(result.hourly);

        const mostCommonSongs = await Promise.all(
          result.most_commonly.map((songId: number) => FetchLyricById(songId.toString()))
        );
        setTopTenPlayedSongs(mostCommonSongs);

        const latestSongs = await Promise.all(
          result.latest.map((songId: number) => FetchLyricById(songId.toString()))
        );
        setTenLatestPlayedSongs(latestSongs);
      } catch (err) {
        console.error('Failed to load playing statistics:', err);
      }
    };

    const fetchLyrics = async () => {
      try {
        const lyricsList = await FetchLyrics();
        setLyrics(lyricsList);
      } catch (error) {
        console.error('Failed to fetch lyrics:', error);
      }
    };

    const handleCurrentState = async (state: SocketState) => {
      if (!state.currentLyric) {
        setCurrentLyricTitle('Trenutno se nobena pesem ne izvaja');
        return;
      }
      try {
        const lyric = await FetchLyricById(state.currentLyric);
        setCurrentLyricTitle(lyric.title);
      } catch (error) {
        console.error('Failed to fetch current lyric:', error);
      }
    };

    fetchPlayingStatistics();
    fetchLyrics();
    connectSocket();
    getCurrentStateAction();
    onCurrentState(handleCurrentState);

    return () => {
      // Cleanup socket connection if necessary
    };
  }, []);

  const handleLyricSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLyricSelect = (lyricId: string) => {
    setLyricAction({ currentLyric: lyricId });
    getCurrentStateAction();
  };

  const handleStop = () => {
    stopAction();
    getCurrentStateAction();
  };

  const filteredLyrics = lyrics
    .filter((lyric) => lyric.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5); // Limit to the first 5 lyrics

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Pozdravljeni! 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} md={6} lg={4}>
          <Card>
            <CardHeader title="Daljinec" />
            <Box p={2}>
              <Typography variant="h6">{currentLyricTitle || 'No song playing'}</Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <SearchIcon />
                <InputBase
                  placeholder="Išči pesem"
                  value={searchQuery}
                  onChange={handleLyricSearch}
                  sx={{ ml: 1, flex: 1 }}
                />
              </Box>
              <List>
                {filteredLyrics.map((lyric) => (
                  <ListItem button key={lyric._id} onClick={() => handleLyricSelect(lyric._id)}>
                    <ListItemText primary={lyric.title} />
                    <PlayArrowIcon />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <IconButton onClick={swipeLeftAction}>
                  <ArrowLeftIcon />
                </IconButton>
                <IconButton onClick={handleStop}>
                  <StopIcon />
                </IconButton>
                <IconButton onClick={refreshDisplayAction}>
                  <RefreshIcon />
                </IconButton>
                <IconButton onClick={swipeRightAction}>
                  <ArrowRightIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Zadnjih 10 pesmi" list={tenLatestPlayedSongs} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="10 najpogostejsih pesmi" list={topTenPlayedSongs} />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Mesecno"
            percent={monthlyStatistics?.percentChange || 0}
            total={monthlyStatistics?.total || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: monthlyStatistics?.categories || [],
              series: monthlyStatistics?.series || [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Dnevno"
            percent={dailyStatistics?.percentChange || 0}
            total={dailyStatistics?.total || 0}
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: dailyStatistics?.categories || [],
              series: dailyStatistics?.series || [],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Urno"
            percent={hourlyStatistics?.percentChange || 0}
            total={hourlyStatistics?.total || 0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: hourlyStatistics?.categories.reverse() || [],
              series: hourlyStatistics?.series.reverse() || [],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
