import React from "react";
import { List } from "semantic-ui-react";
import styles from "./style.module.scss";

const Categories = ({ list, setSelectedCat }) => {
  const handleCatClick = (e) => {
    setSelectedCat(e.target.innerHTML.toLowerCase());
    console.log(e.target.innerHTML);
  };

  return (
    <List>
      {list.map((e, index) => {
        return (
          <List.Item
            key={index}
            onClick={handleCatClick}
            style={{ cursor: "pointer" }}
            className={styles.listStyle}
          >
            {e.toUpperCase()}
          </List.Item>
        );
      })}
    </List>
  );
};

export default Categories;
