export interface Lyric {
  _id: string;
  content: {
    refren: string;
    kitice: string[];
  };
  title: string;
  categories: string[];
}

export type RawLyric = {
  _id: string;
  content: string;
  title: string;
  categories: string[];
};

export type LyricPost = {
  title: string;
  categories: string[];
  content: {
    refren: string;
    kitice: string[];
  };
};

export interface LyricsResponse {
  lyrics: Lyric[];
}

export type LyricRowProps = {
  id: string;
  title: string;
  categories: string[];
};

export interface LyricCategory {
  _id: number;
  category: string;
}

export type LyricCategoryPost = {
  category: string;
};

export interface LyricCategoriesResponse {
  categories: LyricCategory[];
}

export type AppState = {
  appName: string;
  organisation: string;
  marginLeft: number;
  marginRight: number;
};

export type PlayingHistory = {
  id: string;
};

export type SocketState = {
  currentLyric: string;
};

export type TimeFrameStatistics = {
  categories: string[];
  series: number[];
  total: number; // Total number of rows for the timeframe
  percentChange: number; // Percentage increase/decrease compared to the previous timeframe
};

export type Statistics = {
  monthly: TimeFrameStatistics;
  daily: TimeFrameStatistics;
  hourly: TimeFrameStatistics;
  most_commonly: number[];
  latest: number[];
  total: number; // Overall total rows in the playing_history table
};
