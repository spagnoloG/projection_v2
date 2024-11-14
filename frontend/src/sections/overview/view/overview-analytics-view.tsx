import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { FetchPlayingStatistics, FetchLyricById } from 'src/services/apiService';
import type { TimeFrameStatistics } from 'src/types';

import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [monthlyStatistics, setMonthlyStatistics] = useState<TimeFrameStatistics | null>(null);
  const [dailyStatistics, setDailyStatistics] = useState<TimeFrameStatistics | null>(null);
  const [hourlyStatistics, setHourlyStatistics] = useState<TimeFrameStatistics | null>(null);
  const [topTenPlayedSongs, setTopTenPlayedSongs] = useState<any[]>([]);
  const [tenLatestPlayedSongs, setTenLatestPlayedSongs] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlayingStatistics = async () => {
      try {
        const result = await FetchPlayingStatistics();
        setMonthlyStatistics(result.monthly);
        setDailyStatistics(result.daily);
        setHourlyStatistics(result.hourly);

        console.log('Result: ', result);

        // Fetch details for 10 most common and 10 latest songs
        const mostCommonSongs = await Promise.all(
          result.most_commonly.map((songId: number) => FetchLyricById(songId.toString()))
        );
        setTopTenPlayedSongs(mostCommonSongs);

        const latestSongs = await Promise.all(
          result.latest.map((songId: number) => FetchLyricById(songId.toString()))
        );
        setTenLatestPlayedSongs(latestSongs);
        console.log('TopTenPlayedSongs: ', topTenPlayedSongs);
        console.log('TenLatestPlayedSongs: ', tenLatestPlayedSongs);
      } catch (err) {
        console.error('Failed to load playing statistics:', err);
      }
    };

    fetchPlayingStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Pozdravljeni! 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Mesecno"
            percent={monthlyStatistics?.percentChange || 0}
            total={monthlyStatistics?.total || 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
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
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
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
            color="secondary"
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: hourlyStatistics?.categories.reverse() || [],
              series: hourlyStatistics?.series.reverse() || [],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Zadnjih 10 pesmi" list={tenLatestPlayedSongs} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="10 najpogostejsih pesmi" list={topTenPlayedSongs} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="DALJINEC" list={[]} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
