import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Issue } from "../../types/Issue";
import { Card } from "react-bootstrap";
import { changeRow } from "../../features/repoInfoSlice";
import { useAppDispatch } from "../../app/hooks";
import { ItemTypes } from "../../types/ItemTypes";

 type Props = {
   issue: Issue;
   index: number;
   status: string;
 };

export const DraggableIssue: React.FC<Props> = ({
  issue,
  index,
  status,
}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ISSUE,
    hover(item: { index: number, status: string }, monitor) {
    
     
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset
        ? clientOffset.y - hoverBoundingRect.top
        : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        changeRow({
          dragIndex,
          hoverIndex,
          status,
        })
      );
    
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ISSUE,
    item: { issue, index, status, type: ItemTypes.ISSUE },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div key={issue.node_id} style={{ cursor: "grab" }} ref={ref}>
      <Card className="mb-2">
        <Card.Body style={{ opacity: isDragging ? 0 : 1 }}>
          <Card.Text style={{ fontWeight: "bold"}}>
            {issue.title}
          </Card.Text>
          {/* <Card.Text>Number: {issue.number}</Card.Text>
                    <Card.Text>Created {issue.created_at}</Card.Text>
                    <Card.Text>Admin</Card.Text>
                    <Card.Text>Comments: {issue.comments}</Card.Text> */}
        </Card.Body>
      </Card>
    </div>
  );
};

