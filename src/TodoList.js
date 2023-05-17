import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
 
class TodoList extends Component {
    constructor(props) {
        super(props);

        // Retrieve the items from local storage if available
        const savedItems = localStorage.getItem("todoItems");
        const items = savedItems ? JSON.parse(savedItems) : [];


        this.state = {
            items: []
        };
     
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    addItem(e) {
        e.preventDefault();

        if (this._inputElement.value !== "") {
            const newItem = {
              text: this._inputElement.value,
              key: Date.now()
            };
         
            this.setState((prevState) => {
                const updatedItems = prevState.items.concat(newItem);

                localStorage.setItem("todoItems",JSON.stringify(updatedItems));
              return { 
                items: updatedItems,
              };
            });
           
            this._inputElement.value = "";
          }
           
    }

    deleteItem(key) {
        const filteredItems = this.state.items.filter((item) => item.key !== key);
       
        this.setState({
          items: filteredItems
        },
        () => {
            // Save the updated items array to local storage
            localStorage.setItem("todoItems", JSON.stringify(filteredItems));
          }
        );
      }
      


  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a} 
                placeholder="Enter your Task">
            </input>
            <button type="submit">Add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items}
                   delete={this.deleteItem}/>
      </div>
    );
  }
}
 
export default TodoList;