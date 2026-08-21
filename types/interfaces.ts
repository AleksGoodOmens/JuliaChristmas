export interface IPhoto {
  id: number;
  path: string;
  image: string;
  extensions: string[];
  alt: string;
}

export interface INews {
  picSrc: string;
  alt: string;
  date: string;
  title: string;
  desc: string;
  id: string;
}
