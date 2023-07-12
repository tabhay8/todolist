import React, { useState, useEffect } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import TodoContext from "./TodoContext";

function TodoList() {
  const [items, setItems] = useState([]);

  // Load the items from local storage when the component mounts
  useEffect(() => {
    const savedItems = localStorage.getItem("todoItems");
    const parsedItems = savedItems ? JSON.parse(savedItems) : [];
    setItems(parsedItems);
  }, []);

  // Function to handle adding a new item
  const addItem = (e) => {
    e.preventDefault();
    if (inputElement.value !== "") {
      const newItem = {
        text: inputElement.value,
        key: Date.now(),
      };

      // Update the items state by adding the new item
      const updatedItems = [...items, newItem];
      setItems(updatedItems);

      // Save the updated items to local storage
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));

      // Clear the input field
      inputElement.value = "";
    }
  };

  // Function to handle deleting an item
  const deleteItem = (key) => {
    // Filter out the item with the specified key
    const filteredItems = items.filter((item) => item.key !== key);
    setItems(filteredItems);

    // Save the updated items to local storage
    localStorage.setItem("todoItems", JSON.stringify(filteredItems));
  };

  let inputElement;

  return (
    <div className="todoListMain">
      <div className="header">
        <form onSubmit={addItem}>
          {/* Input element for adding new items */}
          <input
            ref={(a) => (inputElement = a)}
            placeholder="Enter your Task"
          />
          {/* Button to submit the form */}
          <button type="submit">Add</button>
        </form>
      </div>
      {/* Provide the items and deleteItem function to the TodoItems component */}
      <TodoContext.Provider value={{ items, deleteItem }}>
        <TodoItems />
      </TodoContext.Provider>
    </div>
  );
}

export default TodoList;
