import React, { useState } from "react";
import TodoItem from "../todoItem/TodoItem";

const TodoListApp = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const addTask = () => {
    if (newTask.title && newTask.description && newTask.deadline) {
      const addedTask = {
        _id: Date.now().toString(),
        ...newTask,
        complete: false,
      };

      setTodoList((prevTodoList) => [...prevTodoList, addedTask]);

      setNewTask({
        title: "",
        description: "",
        deadline: "",
      });
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div>
      <div>
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
            <TodoItem todoList={todoList} setTodoList={setTodoList} />
          </tbody>
        </table>
        <p>Todo List Completed:</p>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          type="date"
          name="deadline"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />

        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default TodoListApp;
