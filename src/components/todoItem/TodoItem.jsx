import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as dateService from "../../services/dateService";

const TodoItem = ({ todoList, setTodoList }) => {
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList")) || [];

    if (storedTodoList.length === 0) {
      const sampleTodoList = [
        {
          _id: uuidv4(),
          title: "Invite Mariya for a first interview",
          description: "Arrange a meeting.",
          deadline: dateService.formatExpiredDate(),
          completed: true,
          disabled: true,
        },
        {
          _id: uuidv4(),
          title: "Check Mariya's task",
          description: "Check the code, test it, run it.",
          deadline: dateService.formatTodaysDate(),
          completed: false,
          disabled: false,
        },
        {
          _id: uuidv4(),
          title: "Call Mariya",
          description: "Invite her for a second interview.",
          deadline: dateService.formatTodaysDate(),
          completed: false,
          disabled: false,
        },

        {
          _id: uuidv4(),
          title: "Invite other candidates",
          description: "Disabled Task",
          deadline: dateService.formatExpiredDate(),
          completed: false,
          disabled: true,
        },
      ];

      setTodoList(sampleTodoList);
    } else {
      setTodoList(storedTodoList);
    }
  }, [setTodoList]);
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const editTask = (taskId) => {
    setEditedTask({ ...todoList.find((task) => task._id === taskId) });
  };

  const saveEditedTask = (taskId) => {
    const updatedTodoList = todoList.map((task) =>
      task._id === taskId ? { ...task, ...editedTask } : task
    );

    setTodoList(updatedTodoList);
    checkTodoListCompletion(updatedTodoList);
    setEditedTask(null);
  };

  const deleteTask = (taskId) => {
    const updatedTodoList = todoList.filter((task) => task._id !== taskId);
    setTodoList(updatedTodoList);
  };

  const completeTask = (taskId) => {
    const taskToComplete = todoList.find((task) => task._id === taskId);

    if (!isTaskExpired(taskToComplete)) {
      const updatedTodoList = todoList.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      );

      setTodoList(updatedTodoList);
      checkTodoListCompletion(updatedTodoList);
    } else {
      const updatedTodoList = todoList.map((task) =>
        task._id === taskId
          ? {
              ...task,
              completed: false,
              // disabled: false,
            }
          : task
      );

      setTodoList(updatedTodoList);
      checkTodoListCompletion(updatedTodoList);
    }
  };

  const uncompleteTask = (taskId) => {
    const updatedTodoList = todoList.map((task) =>
      task._id === taskId && task.completed
        ? { ...task, completed: false }
        : task
    );

    setTodoList(updatedTodoList);
    uncompleteTodoList();
  };

  const checkTodoListCompletion = (updatedTodoList) => {
    const allCompleted = updatedTodoList.every((task) => task.completed);
    if (allCompleted) {
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) => ({ ...task, completed: true }))
      );
    }
  };

  const uncompleteTodoList = () => {
    const anyTaskCompleted = todoList.some((task) => task.completed);
    if (!anyTaskCompleted) {
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) => ({ ...task, completed: false }))
      );
    }
  };

  const isTaskExpired = (task) => {
    const deadlineDate = new Date(task.deadline);
    const currentDate = new Date();

    return (
      (deadlineDate.getFullYear() === currentDate.getFullYear() &&
        deadlineDate.getMonth() === currentDate.getMonth() &&
        deadlineDate.getDate() < currentDate.getDate()) ||
      task.disabled
    );
  };

  return (
    <>
      {todoList.map((task) => (
        <tr
          key={task._id}
          className={`border-gray-light border ${
            task.completed ? "line-through text-gray-500" : ""
          } ${isTaskExpired(task) ? "disabled-task" : ""}`}
        >
          <td className="border-gray-light border p-1 m-1">
            {editedTask && editedTask._id === task._id ? (
              <input
                className="placeholder:italic  block bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-5"
                type="text"
                name="title"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            ) : (
              <p>{task.title}</p>
            )}
          </td>
          <td className="border-gray-light border p-1 m-1">
            {editedTask && editedTask._id === task._id ? (
              <input
                className="placeholder:italic  block bg-white border rounded-md py-2 pl-9 shadow-sm  sm:text-sm m-5"
                type="text"
                name="description"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            ) : (
              <p>{task.description}</p>
            )}
          </td>
          <td className="border-gray-light border p-1 m-1">
            {editedTask && editedTask._id === task._id ? (
              <DatePicker
                className="placeholder:italic block bg-white border rounded-md py-2 pl-9 shadow-sm sm:text-sm m-5"
                selected={
                  editedTask.deadline
                    ? new Date(
                        isNaN(Date.parse(editedTask.deadline))
                          ? dateService.formatTodaysDate()
                          : editedTask.deadline
                      )
                    : null
                }
                onChange={(date) =>
                  setEditedTask((prev) => ({
                    ...prev,
                    deadline: date,
                  }))
                }
                placeholderText="Select a date"
                dateFormat="dd/MM/yyyy"
              />
            ) : (
              <p>
                {task.deadline instanceof Date
                  ? dateService.formatDate(task.deadline)
                  : ""}
              </p>
            )}
          </td>

          <td className="border-gray-light border">
            <button
              className={`rounded-full shadow text-xl p-2 m-2 ${
                task.completed
                  ? "bg-green text-gray-800 "
                  : isTaskExpired(task)
                  ? "bg-gray-dark text-white cursor-not-allowed"
                  : "bg-gray-light"
              }`}
              onClick={() =>
                isTaskExpired(task)
                  ? null
                  : task.completed
                  ? uncompleteTask(task._id)
                  : completeTask(task._id)
              }
              disabled={isTaskExpired(task)}
            >
              {task.completed
                ? "Completed"
                : isTaskExpired(task)
                ? "Expired!"
                : "Uncompleted"}
            </button>
          </td>
          <td>
            {!editedTask || editedTask._id !== task._id ? (
              <>
                <button
                  className="rounded-full bg-yellow shadow text-xl p-2 m-2"
                  onClick={() => editTask(task._id)}
                >
                  Edit
                </button>
                <button
                  className="rounded-full bg-red shadow text-xl p-2 m-2"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="rounded-full bg-green shadow text-xl p-2 m-2"
                  onClick={() => saveEditedTask(task._id)}
                >
                  Save
                </button>
                <button
                  className="rounded-full bg-red shadow text-xl p-2 m-2"
                  onClick={() => setEditedTask(null)}
                >
                  Cancel
                </button>
              </>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoItem;
