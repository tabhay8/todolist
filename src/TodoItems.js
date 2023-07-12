import React, { useContext } from "react";
import TodoContext from "./TodoContext";
import FlipMove from "react-flip-move";

function TodoItems() {
  const { items, deleteItem } = useContext(TodoContext);

  const handleDelete = (key) => {
    deleteItem(key);
  };

  return (
    <ul className="theList">
      <FlipMove duration={250} easing="ease-out">
        {items.map((item) => (
          <li onClick={() => handleDelete(item.key)} key={item.key}>
            {item.text}
          </li>
        ))}
      </FlipMove>
    </ul>
  );
}

export default TodoItems;
