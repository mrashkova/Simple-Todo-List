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

  const isDeadlineExpired = (deadline) => {
    const today = new Date();
    const taskDeadline = new Date(deadline);
    return today > taskDeadline;
  };

  const addTask = () => {
    if (newTask.title && newTask.description && newTask.deadline) {
      const isExpired = isDeadlineExpired(newTask.deadline);

      const addedTask = {
        _id: uuidv4(),
        ...newTask,
        completed: false,
        disabled: isExpired,
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
    <section className="font-montserrat justify-center">
      <div className="m-2 flex justify-center border rounded-md ">
        <input
          className="placeholder:italic  block bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-5"
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          className="placeholder:italic  block bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-5"
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <input
          className="placeholder:italic  block bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-5"
          type="date"
          name="deadline"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />

        <button
          className="rounded-full bg-yellow shadow text-xl p-2 m-3"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="m-3 p-3 grid items-center  ">
        <table className="rounded-md border border-gray-light border-2 text-center">
          <thead className="text-2xl ">
            <tr className="border-gray-light border  p-3 m-3">
              <th className="border-gray-light border ">Title</th>
              <th className="border-gray-light border">Description</th>
              <th className="border-gray-light border ">Deadline</th>
              <th className="border-gray-light border ">Status</th>
              <th className="border-gray-light border ">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xl">
            <TodoItem todoList={todoList} setTodoList={setTodoList} />
          </tbody>
        </table>
      </div>

      {isAllTasksCompleted && <p>All tasks are completed!</p>}
    </section>
  );
};

export default TodoListApp;
