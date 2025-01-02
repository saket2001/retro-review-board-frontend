export default interface IBoardItem {
  _id: string | null | undefined;
  boardId: string;
  comment: string;
  commenterId: string;
  commenterName: string;
  category: string;
  likes?: string;
  createdAt?: string;
  updatedAt?: string;
}
