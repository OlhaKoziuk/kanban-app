import React, { useState } from 'react';
import { InputGroup, FormControl, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getRepoIssues, repoLink, setRepoLink, setRepoName, setStars } from '../../features/repoInfoSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const RepoInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const url = useAppSelector(repoLink);
   const [showModal, setShowModal] = useState(false);
  
 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    dispatch(setRepoLink(userInput));
  };

  const handleInputClear = () => {
    dispatch(setRepoLink(""));
    dispatch(setStars(""));
  }

  const handleClick = (url: string) => {
     const urlPattern =
       /^(https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+)$/;

     if (!urlPattern.test(url)) {
       
       setShowModal(true);
       return;
    }
    
    dispatch(setRepoLink(url));

    const parts = url.split("/");
    const githubIndex = parts.indexOf("github.com");
    if (githubIndex !== -1 && githubIndex < parts.length - 2) {
      const owner = parts[githubIndex + 1];
      const repo = parts[githubIndex + 2];
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
      dispatch(getRepoIssues(apiUrl));
      dispatch(setRepoName(repo));
    }
  };

  return (
    <div className="pt-3 d-flex align-items-center">
      <InputGroup className="custom__input__container me-3 border">
        <FormControl
          type="text"
          style={{ width: "70%" }}
          className="custom__input"
          placeholder="Enter repo URL"
          aria-label="Enter repo URL"
          aria-describedby="basic-addon2"
          value={url}
          onChange={handleInputChange}
        />
        {url && (
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleInputClear}
            style={{ cursor: "pointer", marginTop: "9px", marginRight: "10px" }}
          />
        )}
      </InputGroup>
      <button
        className="btn btn-outline-secondary border"
        style={{ width: "20%" }}
        type="button"
        onClick={() => handleClick(url)}
      >
        Load issues
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter a correct GitHub repository URL.</Modal.Body>
      </Modal>
    </div>
  );
};