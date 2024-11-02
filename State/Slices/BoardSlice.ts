import IBoardDataList from "@/Interfaces/IBoardDataList";
import { createSlice } from "@reduxjs/toolkit";

const boardDataInitialState: IBoardDataList = {
  BoardDataList: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState: boardDataInitialState,
  reducers: {
    addBoardDataToBoardDataList: (state, action) => {
      state.BoardDataList = [
        ...state.BoardDataList,
        action.payload?.NewBoardData,
      ];
    },
    deleteBoardDataById: (state, action) => {
      state.BoardDataList = state.BoardDataList?.filter(
        (boardData) => boardData.Id !== action.payload.BoardId
      );
    },
    updateBoardDataById: (state, action) => {
      state.BoardDataList = state.BoardDataList?.filter(
        (boardData) => boardData.Id !== action.payload.BoardId
      );

      state.BoardDataList = [...state.BoardDataList, action.payload?.BoardData];
    },
    clearBoardData: (state) => {
      state.BoardDataList.length = 0;
    },
    addBoardDataCommentById: (state, action) => {
      state.BoardDataList.forEach((data) => {
        if (data.Id === action.payload.BoardId) {
          data.commentDataList = [
            ...data.commentDataList,
            action.payload.NewComment,
          ];
          return;
        }
      });
    },
    updateBoardDataCommentById: (state, { payload }) => {
      state.BoardDataList.forEach((data) => {
        if (data.Id === payload.BoardId) {
          data.commentDataList = data?.commentDataList?.filter(
            (comments) => comments.Id !== payload?.UpdatedComment?.Id
          );

          data.commentDataList = [
            ...data.commentDataList,
            payload?.UpdatedComment,
          ];
          return;
        }
      });
    },
    deleteBoardDataCommentById: (state, action) => {
      state.BoardDataList.forEach((data) => {
        if (data.Id === action.payload.BoardId) {
          data.commentDataList = data.commentDataList.filter(
            (comments) => comments.Id !== action.payload?.CommentId
          );
          return;
        }
      });
    },
  },
});

export const {
  addBoardDataToBoardDataList,
  deleteBoardDataById,
  updateBoardDataById,
  addBoardDataCommentById,
  updateBoardDataCommentById,
  deleteBoardDataCommentById,
  clearBoardData,
} = boardSlice.actions;

export default boardSlice.reducer;
