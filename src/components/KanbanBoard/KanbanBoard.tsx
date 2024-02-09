import React, { useMemo } from 'react';
import { Board } from '../Board';
import { useAppSelector } from '../../app/hooks';
import { repoData } from '../../features/repoInfoSlice';
import { Issue } from '../../types/Issue';

export const KanbanBoard: React.FC = () => {
  const issues: Issue[] = useAppSelector(repoData);

  const allIssues = useMemo(
    () => [
      {
        id: "1",
        status: "ToDo",
        currentIssues: issues.filter(
          (issue) => issue.state === "open" && issue.assignee === null
        ),
      },
      {
        id: "2",
        status: "In Progress",
        currentIssues: issues.filter(
          (issue) => issue.state === "open" && issue.assignee !== null
        ),
      },
      {
        id: "3",
        status: "Done", 
        currentIssues: issues.filter((issue) => issue.state === "closed"),
      },
    ],
    [issues]
  ); 
   
  return (
      <div className="d-flex justify-content-between gap-2 kanban-board">
        {allIssues.map((i) => (
          <Board key={i.id} status={i.status} issues={i.currentIssues} />
        ))}
      </div>
  );
};



