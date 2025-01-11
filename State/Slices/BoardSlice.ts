import IBoardData from "@/Interfaces/IBoardData";
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
    updateBoardDataById: (state, { payload }) => {
      //this function only updates board info not comments\

      //finding board index
      const index = state?.BoardDataList?.findIndex(
        (boardData) => boardData._id === payload.BoardId
      );

      //updating data
      if (index > -1) {
        const allCommentsData = state.BoardDataList[index]?.commentDataList;
        const updatedBoardObj: IBoardData = {
          ...payload?.BoardData,
          commentDataList: allCommentsData,
        };

        //removing old board
        state.BoardDataList.splice(index, 1);
        state.BoardDataList = [...state.BoardDataList, updatedBoardObj];
      }
    },
    clearBoardData: (state) => {
      state.BoardDataList.length = 0;
    },
    addBoardDataCommentById: (state, { payload }) => {
      state.BoardDataList?.forEach((board) => {
        if (board?._id === payload.BoardId) {
          const commentExists = board.commentDataList?.findIndex(
            (c) => c?._id === payload.NewComment?._id
          );
          if (commentExists === -1)
            board.commentDataList.push(payload.NewComment);
          return;
        }
      });
    },
    updateBoardDataCommentById: (state, { payload }) => {
      state.BoardDataList?.forEach((board) => {
        if (board._id === payload.BoardId) {
          board.commentDataList = board?.commentDataList?.filter(
            (comments) => comments?._id !== payload?.UpdatedComment?._id
          );

          board.commentDataList = [
            ...board.commentDataList,
            payload?.UpdatedComment,
          ];
          return;
        }
      });
    },
    deleteBoardDataCommentById: (state, { payload }) => {
      state.BoardDataList?.forEach((board) => {
        if (board?._id === payload.BoardId) {
          board.commentDataList = board?.commentDataList?.filter(
            (c) => c?._id !== payload?.CommentId
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
