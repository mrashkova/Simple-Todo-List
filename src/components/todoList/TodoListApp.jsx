import React from "react";
import TodoItem from "../todoItem/TodoItem";

const TodoListApp = () => {
  return (
    <div>
      <div>
        <h2>Todo List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <TodoItem />
          </tbody>
        </table>
        <p>Todo List Completed:</p>
        <button>Add Task</button>
      </div>
    </div>
  );
};

export default TodoListApp;
