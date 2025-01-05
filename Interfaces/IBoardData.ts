import IBoardItem from "./IBoardItem";

export default interface IBoardData {
  _id: string;
  boardName: string;
  ownerUserId: string;
  boardCategories: string;
  deleteBoardDataAfterDays: number;
  userCommentsMasked: boolean;
  isBoardLocked: boolean;
  boardCode?: string;
  createdAt: string;
  commentDataList: IBoardItem[];
}
