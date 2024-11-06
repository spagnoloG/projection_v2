export interface Lyric {
  _id: string;
  content: {
    refren: string;
    kitice: string[];
  };
  title: string;
  categories: string[];
}

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
