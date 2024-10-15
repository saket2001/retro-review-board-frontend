export default interface IBoardItem {
  Id: string | number;
  comment: string;
  commenterId: string | number;
  commerterName: string;
  category: string;
  likes: string;
  createdAt: string;
  updatedAt: string;
}
