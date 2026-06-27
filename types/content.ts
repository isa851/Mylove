export type TimelineItem = {
  date: string;
  title: string;
  description: string;
  image: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
};

export type RomanticContent = {
  site: {
    title: string;
    description: string;
    url: string;
  };
  music: {
    title: string;
    artist: string;
    piano: string;
    celebration: string;
  };
  opening: {
    prelude: string;
    button: string;
  };
  counterStartDate: string;
  timeline: TimelineItem[];
  gallery: GalleryItem[];
  reasons: string[];
  letter: {
    title: string;
    body: string;
  };
  skyMessages: string[];
  final: {
    love: string;
    lastQuestion: string;
    proposal: string;
    accepted: string;
  };
};
