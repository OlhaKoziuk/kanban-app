import React from 'react';
import { Issue } from '../../types/Issue';
import { Card } from "react-bootstrap";
import { DraggableIssue } from '../DraggableIssue';
import { useDrop } from 'react-dnd';
import { changeColumn } from '../../features/repoInfoSlice';
import { useAppDispatch } from '../../app/hooks';
import { ItemTypes } from '../../types/ItemTypes';

type Props = {
  status: string,
  issues: Issue[] | [],
};

export const RepoInfo: React.FC<Props> = ({ status, issues }) => {
  const dispatch = useAppDispatch();
 
  const [, drop] = useDrop({
    accept: ItemTypes.ISSUE,
    drop: (item: { issue: Issue }) => {
      const { issue } = item;
     
      
      let updatedIssue;
      switch (status) {
        case "ToDo":
          updatedIssue = { ...issue };
          updatedIssue.state = "open";
          updatedIssue.assignee = null;

          break;
        case "In Progress":
          updatedIssue = { ...issue };
          updatedIssue.state = "open";
          updatedIssue.assignee = { login: "somebody" };

          break;
        case "Done":
          updatedIssue = { ...issue };
          updatedIssue.state = "closed";
          break;
        default:
          break;
      };
      dispatch(changeColumn(updatedIssue));
     },
   });

  return (
    <div ref={drop} className="board">
      <Card style={{ border: "none" }}>
        <Card.Header className="text-center bg-white">{status}</Card.Header>
          <Card.Body
            style={{
              background: "#dcd0ff",
              minHeight: "65vh",
              border: "1px solid black",
            }}
          >
            <ul className="list-unstyled ">
              {issues.map((issue, index) => (
                <DraggableIssue
                  key={issue.node_id}
                  issue={issue}
                  index={index}
                  status={status}
                />
              ))}
            </ul>
          </Card.Body>
      </Card>
    </div>
  );
};






 

