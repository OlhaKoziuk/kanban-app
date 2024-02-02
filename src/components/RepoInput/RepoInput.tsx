import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getRepoIssues, setRepoLink, setRepoName } from '../../features/repoInfoSlice';
import { repoUrl, setUrl } from '../../features/repoURLSlice';

export const RepoInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const url = useAppSelector(repoUrl);
  // const repo = useAppSelector(repoName);
  // console.log(repo);
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    dispatch(setUrl(userInput));
  };

  const handleClick = (url: string) => {
    dispatch(setRepoLink(url));

    const parts = url.split("/");
    const githubIndex = parts.indexOf("github.com");
    if (githubIndex !== -1 && githubIndex < parts.length - 2) {
      const owner = parts[githubIndex + 1];
      const repo = parts[githubIndex + 2];
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/issues`;
      dispatch(getRepoIssues(apiUrl));
      dispatch(setRepoName(repo));
    }
  };

  return (
    <div className="pt-3">
      <div className="input-group mb-3 custom__input__container">
        <input
          type="text"
          className="form-control me-3 custom__input"
          placeholder="Enter repo URL"
          aria-label="Enter repo URL"
          aria-describedby="basic-addon2"
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => handleClick(url)}
          >
            Load issues
          </button>
        </div>
      </div>
    </div>
  );
};