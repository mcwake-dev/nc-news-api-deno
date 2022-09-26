export default interface IArticle {
  article_id: number;
  title: string;
  topic: string;
  author: string;
  body: string;
  created_at: Date;
  votes: number;
}
