import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Issue } from "../types/Issue";
import { RootState } from "../app/store";

interface RepoInfoState {
  issues: Issue[] | [];
  repoName: string;
  repoLink: string;
  stars: string;
  status: "idle" | "loading" | "failed";
}

const initialState: RepoInfoState = {
  issues: [],
  repoName: "",
  repoLink: "",
  stars: "",
  status: "idle",
};



export const getRepoIssues = createAsyncThunk(
  "repoData/fetchRepoIssues",
  async (repoUrl: string) => {
    try {
      const issuesUrl = `${repoUrl}/issues`;
      const issuesResponse = await axios.get<Issue[]>(issuesUrl, {
        headers: {
          Authorization: `Bearer enter your access token here`,
        },
      });

      const mappedIssues = issuesResponse.data.map((issue) => ({
        node_id: issue.node_id,
        number: issue.number,
        title: issue.title,
        created_at: issue.created_at,
        state: issue.state,
        assignee: issue.assignee,
        comments: issue.comments,
        author_association: issue.author_association,
      }));

      const repoResponse = await axios.get(repoUrl, {
        headers: {
          Authorization: `Bearer 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`,
        },
      });

      const starsCount = repoResponse.data.stargazers_count;

      return {
        issues: mappedIssues,
        starsCount,
      };
    } catch (error) {
      console.error("Error fetching repository issues:", error);
      throw error;
    }
  }
);

const repoInfoSlice = createSlice({
  name: "repoData",
  initialState,
  reducers: {
    setRepoName: (state, action) => {
      state.repoName = action.payload;
    },
    setRepoLink: (state, action) => {
      state.repoLink = action.payload;
    },
    setStars: (state, action) => {
      state.stars = action.payload;
    },
    changeColumn: (state, action) => {
      state.issues = state.issues.map((i) => {
        if (i.node_id === action.payload.node_id) {
          return action.payload;
        }
        return i;
      });
      localStorage.setItem(
        `repoIssue-${state.repoName}`,
        JSON.stringify(state.issues)
      );
    },
    changeRow: (state, action) => {
      const { dragIndex, hoverIndex, status } = action.payload;

      const filteredIssues = state.issues.filter((issue) => {
        if (status === "ToDo") {
          return issue.state === "open" && issue.assignee === null;
        } else if (status === "In Progress") {
          return issue.state === "open" && issue.assignee !== null;
        } else if (status === "Done") {
          return issue.state === "closed";
        }
        return false;
      });

      const movedIssue = filteredIssues[dragIndex];
      filteredIssues.splice(dragIndex, 1);
      filteredIssues.splice(hoverIndex, 0, movedIssue);

      state.issues = state.issues.map((issue) => {
        if (
          (status === "ToDo" &&
            issue.state === "open" &&
            issue.assignee === null) ||
          (status === "In Progress" &&
            issue.state === "open" &&
            issue.assignee !== null) ||
          (status === "Done" && issue.state === "closed")
        ) {
          return filteredIssues.shift() || issue;
        }
        return issue;
      });
      localStorage.setItem(
        `repoIssue-${state.repoName}`,
        JSON.stringify(state.issues)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRepoIssues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRepoIssues.fulfilled, (state, action) => {
        state.status = "idle";
        const storedIssues = localStorage.getItem(
          `repoIssue-${state.repoName}`
        );
        state.issues = storedIssues
          ? JSON.parse(storedIssues)
          : action.payload.issues;
        state.stars = action.payload.starsCount;
      })
      .addCase(getRepoIssues.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const repoData = (state: RootState) => state.repoInfo.issues;
export const repoName = (state: RootState) => state.repoInfo.repoName;
export const repoLink = (state: RootState) => state.repoInfo.repoLink;
export const repoStars = (state: RootState) => state.repoInfo.stars;

export const { setRepoName, changeColumn, changeRow, setRepoLink, setStars } =
  repoInfoSlice.actions;

export default repoInfoSlice.reducer;

