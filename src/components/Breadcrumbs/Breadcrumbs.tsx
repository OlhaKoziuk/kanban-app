import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { repoLink, repoStars } from '../../features/repoInfoSlice';
import { Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


export const Breadcrumbs: React.FC = () => {
  const url = useAppSelector(repoLink);
   const stars = useAppSelector(repoStars);
  const urlParts = url.split("/").filter((part) => part !== "");
  const lastTwoParts = urlParts.slice(-2);

  const formatStars = (stars: string) => {
    let starsCount = +stars;
    const suffixes = ["", "k", "M", "B", "T"];
    let suffixIndex = 0;

    while (starsCount >= 1000) {
      starsCount /= 1000;
      suffixIndex += 1;
    }

    return `${starsCount.toFixed(1)}${suffixes[suffixIndex]} stars`;
  };
 
  let previousPart = "";

  return (
    <div className="mt-3">
      {stars && (
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

          <li className="ms-3 d-flex gap-1 align-items-start">
            {stars && (
              <FontAwesomeIcon icon={faStar} style={{ marginTop: "4px" }} />
            )}
            <p>{stars && formatStars(stars)}</p>
          </li>
        </Breadcrumb>
      )}
    </div>
  );
};