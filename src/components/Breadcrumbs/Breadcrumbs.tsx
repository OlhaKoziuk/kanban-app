import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { repoLink } from '../../features/repoInfoSlice';
import { Breadcrumb } from "react-bootstrap";

export const Breadcrumbs: React.FC = () => {
  const url = useAppSelector(repoLink);
  const urlParts = url.split("/").filter((part) => part !== "");
  const lastTwoParts = urlParts.slice(-2);
  
  let previousPart = "";

  return (
    <Breadcrumb className="ps-1">
      {lastTwoParts.map((part) => {
        const currentUrl = `https://github.com/${previousPart}/${part}/`;

        previousPart = `${previousPart}/${part}`;

        return (
          <Breadcrumb.Item
            key={part}
            href={currentUrl}
            target="_blank"
          >
            {part}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};