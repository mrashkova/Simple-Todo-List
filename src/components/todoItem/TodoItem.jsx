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

    const formattedTodoList = storedTodoList.map((task) => ({
      ...task,
      deadline: dateService.formatDate(new Date(task.deadline), "MM/dd/yyyy"),
    }));

    if (formattedTodoList.length === 0) {
      setTodoList(sampleTodoList);
    } else {
      setTodoList(formattedTodoList);
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
          {/* Title */}

          <td className="border-gray-light border w-[250px]">
            {editedTask && editedTask._id === task._id ? (
              <input
                className="placeholder:italic block border border-gray-light rounded-md w-full px-2  text-center"
                type="text"
                name="title"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask((prev) => ({
                    ...prev,
                    title: e.target.value !== "" ? e.target.value : prev.title,
                  }))
                }
              />
            ) : (
              <p className="m-0 text-center">{task.title}</p>
            )}
          </td>
          {/* Description */}
          <td className="border-gray-light border w-[250px]">
            {editedTask && editedTask._id === task._id ? (
              <input
                className="placeholder:italic block border border-gray-light rounded-md w-full px-2  text-center"
                type="text"
                name="description"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask((prev) => ({
                    ...prev,
                    description:
                      e.target.value !== "" ? e.target.value : prev.description,
                  }))
                }
              />
            ) : (
              <p className="m-0 text-center">{task.description}</p>
            )}
          </td>
          {/* Deadline input */}
          <td className="border-gray-light border w-[250px]">
            {editedTask && editedTask._id === task._id ? (
              <DatePicker
                className="placeholder:italic block border border-gray-light rounded-md w-full px-2 text-center"
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
                    deadline: date !== null ? date : prev.deadline,
                  }))
                }
                placeholderText="Select a date"
                dateFormat="MM/dd/yyyy"
                showYearDropdown
                showMonthDropdown
              />
            ) : (
              <p className="m-0 text-center">
                {task.deadline instanceof Date
                  ? dateService.formatDate(task.deadline, "MM/dd/yyyy")
                  : task.deadline}
              </p>
            )}
          </td>

          <td className="border-gray-light border  w-[250px]">
            <button
              className={`rounded-full shadow text-xl p-2  ${
                task.completed
                  ? "bg-green text-gray-800 "
                  : taskService.isTaskExpired(task)
                  ? "bg-gray-dark text-white cursor-not-allowed"
                  : "bg-gray-light"
              }`}
              onClick={() => {
                if (taskService.isTaskExpired(task) || task.completed) {
                  return; // Task is expired or already completed, prevent uncompletion
                }

                // Task is not expired and not completed, toggle completion
                const updatedTodoList = todoList.map((t) =>
                  t._id === task._id ? { ...t, completed: true } : t
                );
                setTodoList(updatedTodoList);
              }}
              disabled={taskService.isTaskExpired(task) || task.completed}
            >
              {task.completed
                ? "Completed"
                : taskService.isTaskExpired(task)
                ? "Expired!"
                : "Uncompleted"}
            </button>
          </td>

          <td className="w-[250px]">
            {/* Toggle between Edit & Delete / Save & Cancel */}
            {!editedTask || editedTask._id !== task._id ? (
              <>
                {/* Edit Button */}
                <button
                  className="rounded-full bg-yellow shadow text-xl p-2 "
                  onClick={() =>
                    taskService.editTask(task._id, todoList, setEditedTask)
                  }
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  className="rounded-full bg-red shadow text-xl p-2 m-1"
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
                  className="rounded-full bg-green shadow text-xl p-2 "
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
                  className="rounded-full bg-red shadow text-xl p-2 m-1"
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
