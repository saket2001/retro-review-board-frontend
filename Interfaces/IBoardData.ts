import IBoardItem from "./IBoardItem";

export default interface IBoardData {
  Id: string;
  boardName: string;
  ownerUserId: string;
  boardCategories: string;
  userCommentsMasked: boolean;
  isBoardLocked: boolean;
  createdAt: string;
  dataList: IBoardItem[];
}
