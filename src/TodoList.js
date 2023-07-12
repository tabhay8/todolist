import React, { useState, useEffect } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import TodoContext from "./TodoContext";

function TodoList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("todoItems");
    const parsedItems = savedItems ? JSON.parse(savedItems) : [];
    setItems(parsedItems);
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    if (inputElement.value !== "") {
      const newItem = {
        text: inputElement.value,
        key: Date.now(),
      };

      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem("todoItems", JSON.stringify(updatedItems));
      inputElement.value = "";
    }
  };

  const deleteItem = (key) => {
    const filteredItems = items.filter((item) => item.key !== key);
    setItems(filteredItems);
    localStorage.setItem("todoItems", JSON.stringify(filteredItems));
  };

  let inputElement;

  return (
    <div className="todoListMain">
      <div className="header">
        <form onSubmit={addItem}>
          <input
            ref={(a) => (inputElement = a)}
            placeholder="Enter your Task"
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <TodoContext.Provider value={{ items, deleteItem }}>
        <TodoItems />
      </TodoContext.Provider>
    </div>
  );
}

export default TodoList;
