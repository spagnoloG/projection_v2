export interface Lyric {
  _id: string;
  content: string;
  title: string;
  categories: string[];
}

export interface LyricsResponse {
  lyrics: Lyric[];
}

export type LyricRowProps = {
  id: string;
  title: string;
  categories: string[];
};
