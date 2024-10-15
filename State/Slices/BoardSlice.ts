import IBoardData from "@/Interfaces/IBoardData";
import { createSlice } from "@reduxjs/toolkit";

const boardDataInitialState: IBoardData = {
  boardName: "",
  ownerUserId: "",
  boardCategories: "",
  userCommentsMasked: true,
  isBoardLocked: false,
  createdAt: "",
  dataList: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState: boardDataInitialState,
  reducers: {
    deleteBoardData: (state) => {
      state.boardName = null;
      state.ownerUserId = null;
      state.boardCategories = null;
      state.userCommentsMasked = null;
      state.isBoardLocked = null;
      state.createdAt = null;
      state.dataList.length = 0;
    },
    updateBoardData: (state, action) => {
      state.boardName = action.payload?.boardName;
      state.ownerUserId = action.payload?.ownerUserId;
      state.boardCategories = action.payload?.boardCategories;
      state.userCommentsMasked = action.payload?.userCommentsMasked;
      state.isBoardLocked = action.payload?.isBoardLocked;
      state.createdAt = action.payload?.createdAt;
      state.dataList = action.payload?.dataList;
    },
    updateBoardDataComment: (state, action) => {
      state.dataList = [...state.dataList, action.payload];
    },
    deleteBoardDataCommentById: (state, action) => {
      state.dataList = state.dataList?.filter(
        (item) => item.Id !== action.payload?.Id
      );
    },
  },
});

export const {
  updateBoardData,
  deleteBoardData,
  updateBoardDataComment,
  deleteBoardDataCommentById,
} = boardSlice.actions;

export default boardSlice.reducer;
