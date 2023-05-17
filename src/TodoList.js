import React, { useState, useEffect } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

function TodoList() {
  // State to hold the list of items
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Retrieve the items from local storage when the component mounts
    const savedItems = localStorage.getItem("todoItems");
    const parsedItems = savedItems ? JSON.parse(savedItems) : [];
    setItems(parsedItems);
  }, []);

  // Function to handle adding a new item
  const addItem = (e) => {
    e.preventDefault();
    if (inputElement.value !== "") {
      // Create a new item object
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
    
    // Update the items state with the filtered items
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
      {/* TodoItems component to display the list */}
      <TodoItems entries={items} delete={deleteItem} />
    </div>
  );
}

export default TodoList;
