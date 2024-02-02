import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface RepoUrlState {
  url: string;
}

const initialState: RepoUrlState = {
  url: "",
};

export const repoUrlSlice = createSlice({
  name: "repoUrl",
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setUrl } = repoUrlSlice.actions;

export const repoUrl = (state: RootState) => state.repoUrl.url;

export default repoUrlSlice.reducer;
