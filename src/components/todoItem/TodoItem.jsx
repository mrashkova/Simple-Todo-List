import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import * as dateService from "../../services/dateService";
import * as taskService from "../../services/taskService";

import { sampleTodoList } from "../../constants/todoConstants";

const TodoItem = ({ todoList, setTodoList }) => {
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList")) || [];

    if (storedTodoList.length === 0) {
      setTodoList(sampleTodoList);
    } else {
      setTodoList(storedTodoList);
    }
  }, [setTodoList]);
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      {todoList.map((task) => (
        <tr
          key={task._id}
          className={`border-gray-light border ${
            task.completed ? "line-through text-gray-500" : ""
          } ${taskService.isTaskExpired(task) ? "disabled-task" : ""}`}
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
                  : taskService.isTaskExpired(task)
                  ? "bg-gray-dark text-white cursor-not-allowed"
                  : "bg-gray-light"
              }`}
              onClick={() =>
                taskService.isTaskExpired(task)
                  ? null
                  : task.completed
                  ? taskService.uncompleteTask(task._id, todoList, setTodoList)
                  : taskService.completeTask(task._id, todoList, setTodoList)
              }
              disabled={taskService.isTaskExpired(task)}
            >
              {task.completed
                ? "Completed"
                : taskService.isTaskExpired(task)
                ? "Expired!"
                : "Uncompleted"}
            </button>
          </td>
          <td>
            {/* Toggle between Edit & Delete / Save & Cancel */}
            {!editedTask || editedTask._id !== task._id ? (
              <>
                {/* Edit Button */}
                <button
                  className="rounded-full bg-yellow shadow text-xl p-2 m-2"
                  onClick={() =>
                    taskService.editTask(task._id, todoList, setEditedTask)
                  }
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  className="rounded-full bg-red shadow text-xl p-2 m-2"
                  onClick={() =>
                    taskService.deleteTask(task._id, todoList, setTodoList)
                  }
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                {/* Save Button */}
                <button
                  className="rounded-full bg-green shadow text-xl p-2 m-2"
                  onClick={() =>
                    taskService.saveEditedTask(
                      task._id,
                      todoList,
                      setTodoList,
                      editedTask,
                      setEditedTask
                    )
                  }
                >
                  Save
                </button>
                {/* Cancel Button */}
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
