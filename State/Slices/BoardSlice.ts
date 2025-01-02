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
      if (action.payload?.NewBoardData) {
        state.BoardDataList.push(action.payload?.NewBoardData);
      }
    },
    updateBoardDataToBoardDataList: (state, action) => {
      if (action.payload?.NewBoardData) {
        state.BoardDataList = state.BoardDataList?.filter(
          (board) => board?._id !== action.payload?.NewBoardData?._id
        );
        state.BoardDataList.push(action.payload?.NewBoardData);
      }
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
      state.BoardDataList?.forEach((board) => {
        if (board?._id === action.payload.BoardId) {
          board.commentDataList.push(action.payload.NewComment);
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
      state.BoardDataList?.forEach((board) => {
        if (board?._id === action.payload.BoardId) {
          board.commentDataList = board?.commentDataList?.filter(
            (comments) => comments._id != action.payload?.CommentId
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
  updateBoardDataToBoardDataList,
} = boardSlice.actions;

export default boardSlice.reducer;
