import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
        _id: uuidv4(),
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

  const isTodoListCompleted = (todoList) =>
    todoList.every((task) => task.completed);

  const isAllTasksCompleted = isTodoListCompleted(todoList);

  return (
    <div>
      <div>
        <table className="table-auto border-spacing-2 border border-slate-500 pt-6">
          <thead className="pt-6">
            <tr className="pt-6">
              <th className="border border-slate-600 pt-6">Title</th>
              <th className="border border-slate-600 mx-8">Description</th>
              <th className="border border-slate-600">Deadline</th>
              <th className="border border-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <TodoItem todoList={todoList} setTodoList={setTodoList} />
          </tbody>
        </table>

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

      {isAllTasksCompleted && <p>All tasks are completed!</p>}
    </div>
  );
};

export default TodoListApp;
