// eslint-disable-entire-file no-unused-vars

import React from "react";

import languageColors from "../../colors.json";
import "./ListItem.css";

export const ListItem = (props) => {
  const {
    data: { name, description, language, html_url, updated_at },
  } = props;
  const languageColor = languageColors[language]?.color;
  const updatedDate = new Date(updated_at).toDateString().slice(4);


  return (
    <li className="repo-li">
      <div>
        <h3>
          <a href={html_url} className="repo-li-heading">
            {name}
          </a>
        </h3>
        <p className="repo-li-description">{description}</p>
      </div>
      <div className="repo-li-other-detail">
        {language && (
          <span className="repo-language-container">
            <span
              className="repo-language-color"
              style={{ backgroundColor: languageColor }}
            ></span>
            <span className="repo-language-text-color">{language}</span>
          </span>
        )}
        <span className="repo-language-updated-date">Updated on {updatedDate}</span>
      </div>
    </li>
  );
};

export default ListItem;
