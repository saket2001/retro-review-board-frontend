import IBoardDataList from "@/Interfaces/IBoardDataList";
import { createSlice } from "@reduxjs/toolkit";

const boardDataInitialState: IBoardDataList = {
  BoardDataList: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState: boardDataInitialState,
  reducers: {
    createNewBoardDataList: (state, { payload }) => {
      clearBoardData();
      state.BoardDataList = payload;
    },
    addBoardDataToBoardDataList: (state, action) => {
      state.BoardDataList = [
        ...state.BoardDataList,
        action.payload?.NewBoardData,
      ];
    },
    deleteBoardDataById: (state, action) => {
      state.BoardDataList = state?.BoardDataList?.filter(
        (boardData) => boardData._id !== action.payload.BoardId
      );
    },
    updateBoardDataById: (state, action) => {
      state.BoardDataList = state?.BoardDataList?.filter(
        (boardData) => boardData._id !== action.payload.BoardId
      );

      state.BoardDataList = [...state.BoardDataList, action.payload?.BoardData];
    },
    clearBoardData: (state) => {
      state.BoardDataList.length = 0;
    },
    addBoardDataCommentById: (state, action) => {
      state.BoardDataList?.forEach((data) => {
        if (data._id === action.payload.BoardId) {
          data.commentDataList = [
            ...data.commentDataList,
            action.payload.NewComment,
          ];
          return;
        }
      });
    },
    updateBoardDataCommentById: (state, { payload }) => {
      state.BoardDataList?.forEach((data) => {
        if (data._id === payload.BoardId) {
          data.commentDataList = data?.commentDataList?.filter(
            (comments) => comments._id !== payload?.UpdatedComment?._id
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
      state.BoardDataList?.forEach((data) => {
        if (data._id === action.payload.BoardId) {
          data.commentDataList = data.commentDataList.filter(
            (comments) => comments._id !== action.payload?.CommentId
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
  createNewBoardDataList,
} = boardSlice.actions;

export default boardSlice.reducer;
