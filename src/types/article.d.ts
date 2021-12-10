export interface Comment {
  _id?: string;
  commenterName: string;
  commenterId: string;
  date: string;
  text: string;
}
export interface IArticle {
  date: number;
  url: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  source: string;
  comments: Comment[];
}
