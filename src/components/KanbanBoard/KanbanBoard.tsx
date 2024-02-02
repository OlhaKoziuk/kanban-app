import React, { useMemo } from 'react';
import { RepoInfo } from '../RepoInfo';
import { useAppSelector } from '../../app/hooks';
import { repoData, repoName } from '../../features/repoInfoSlice';
import { Issue } from '../../types/Issue';

export const KanbanBoard: React.FC = () => {
 const currName = useAppSelector(repoName);
 const storageIssuesString = localStorage.getItem(`repoIssue-${currName}`);
 const storageIssues = storageIssuesString
   ? JSON.parse(storageIssuesString)
   : [];
 const stateIssues = useAppSelector(repoData);
 const issues: Issue[] = storageIssues.length > 0 ? storageIssues : stateIssues;
console.log(issues);

  const allIssues = useMemo(
    () => [
      {
        id: 1,
        status: "ToDo",
        currentIssues: issues.filter(
          (issue) => issue.state === "open" && issue.assignee === null
        ),
      },
      {
        id: 2,
        status: "In Progress",
        currentIssues: issues.filter(
          (issue) => issue.state === "open" && issue.assignee !== null
        ),
      },
      {
        id: 3,
        status: "Done", 
        currentIssues: issues.filter((issue) => issue.state === "closed"),
      },
    ],
    [issues]
  ); 
   console.log(allIssues);
   
  
  return (
    <div className="d-flex gap-3">
      {allIssues.map((i) => (
        <RepoInfo key={i.id} status={i.status} issues={i.currentIssues} />
      ))}
    </div>
  );
};



