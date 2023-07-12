import React, { useContext } from "react";
import TodoContext from "./TodoContext";
import FlipMove from "react-flip-move";

function TodoItems() {
  // Access the items and deleteItem function from the TodoContext using useContext hook
  const { items, deleteItem } = useContext(TodoContext);

  // Function to handle the deletion of an item
  const handleDelete = (key) => {
    deleteItem(key);
  };

  return (
    <ul className="theList">
      {/* Use FlipMove for animated transitions */}
      <FlipMove duration={250} easing="ease-out">
        {/* Render the list of items */}
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
