import IBoardData from "@/Interfaces/IBoardData";
import { createSlice } from "@reduxjs/toolkit";

interface ISearchedBoardProps {
  SearchQuery: string;
  IsExactSearch: boolean;
  BoardDataList: IBoardData[];
}

const searchedBoardsSliceInitialState: ISearchedBoardProps = {
  SearchQuery: "",
  IsExactSearch: false,
  BoardDataList: [],
};

export const searchedBoardsSlice = createSlice({
  name: "searchedBoard",
  initialState: searchedBoardsSliceInitialState,
  reducers: {
    updateSearchQueryParameters: (state, action) => {
      if (action.payload) {
        state.SearchQuery = action.payload.boardCodeInput;
        state.IsExactSearch = action.payload.isExactSearch;
      }
    },
    updateSearchResult: (state, action) => {
      if (action.payload) {
        state.BoardDataList = action.payload;
      }
    },
    resetSearchState: (state) => {
      state.BoardDataList = [];
      state.SearchQuery = "";
      state.IsExactSearch = false;
    },
  },
});

export const {
  updateSearchResult,
  updateSearchQueryParameters,
  resetSearchState,
} = searchedBoardsSlice.actions;

export default searchedBoardsSlice.reducer;
