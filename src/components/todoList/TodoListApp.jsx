import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as dateService from "../../services/dateService";

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
        deadline: isExpired
          ? newTask.deadline // Keep the original format if expired
          : dateService.formatDate(new Date(newTask.deadline), "MM/dd/yyyy"),
        completed: false,
        disabled: isExpired,
      };

      setTodoList((prevTodoList) => [...prevTodoList, addedTask]);

      setNewTask({
        title: "",
        description: "",
        deadline: null,
      });
    } else {
      alert("Please fill all fields.");
    }
  };

  const isTodoListCompleted = (todoList) =>
    todoList.every((task) => task.completed);

  const isAllTasksCompleted = isTodoListCompleted(todoList);

  return (
    <section className="font-montserrat justify-center grid place-items-center">
      {/* Add Task */}
      <div className="rounded-md border border-gray-light border-2 text-center 	w-fit">
        <input
          className="rounded-md border border-gray-light placeholder:italic bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-3"
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          className="rounded-md border border-gray-light placeholder:italic bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-3"
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <DatePicker
          className="rounded-md border border-gray-light placeholder:italic bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-3"
          selected={newTask.deadline ? new Date(newTask.deadline) : null}
          onChange={(date) => setNewTask({ ...newTask, deadline: date })}
          placeholderText="Select a date"
          dateFormat="MM/dd/yyyy"
        />

        <button
          className="rounded-full bg-yellow shadow text-xl p-2 m-2"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Table */}
      <div className="m-1 p-3 grid items-center w-full">
        <table className="rounded-md border border-gray-light border-2 text-center 	w-fit">
          <thead className="text-2xl ">
            <tr className="border-gray-light border">
              <th className="border-gray-light border m-1 w-[250px]">Title</th>
              <th className="border-gray-light border  m-1 w-[250px]">
                Description
              </th>
              <th className="border-gray-light border  m-1 w-[250px]">
                Deadline
              </th>
              <th className="border-gray-light border m-1 w-[250px]">Status</th>
              <th className="border-gray-light border m-1 w-[250px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-l">
            <TodoItem todoList={todoList} setTodoList={setTodoList} />
          </tbody>
        </table>
      </div>

      {todoList.length > 0 ? (
        isAllTasksCompleted ? (
          <p className="justify-center text-2xl align-center ">
            All tasks are completed!
          </p>
        ) : null
      ) : (
        <p className="justify-center text-2xl align-center ">
          There are no tasks!
        </p>
      )}
    </section>
  );
};

export default TodoListApp;
