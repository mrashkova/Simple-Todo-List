import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import * as dateService from "../../services/dateService";

const TodoItem = ({ todoList, setTodoList }) => {
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList")) || [];

    if (storedTodoList.length === 0) {
      const sampleTodoList = [
        {
          _id: uuidv4(),
          title: "Sample Task 1",
          description: "Description for Sample Task 1",
          deadline: dateService.formatDate(),
          completed: false,
          disabled: false,
        },
        {
          _id: uuidv4(),
          title: "Sample Task 2",
          description: "Description for Sample Task 2",
          deadline: dateService.formatDate(),
          completed: false,
          disabled: false,
        },
        {
          _id: uuidv4(),
          title: "Expired Task",
          description: "Description for Expired Task",
          deadline: "2022-01-01",
          completed: false,
          disabled: false,
        },
        {
          _id: uuidv4(),
          title: "Disabled Task",
          description: "Description for Disabled Task",
          deadline: dateService.formatDate(),
          completed: false,
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
    setEditedTask(null);
  };

  const deleteTask = (taskId) => {
    const updatedTodoList = todoList.filter((task) => task._id !== taskId);
    setTodoList(updatedTodoList);
  };

  const completeTask = (taskId) => {
    const updatedTodoList = todoList.map((task) =>
      task._id === taskId && !task.expired && !task.disabled
        ? { ...task, completed: true }
        : task
    );

    setTodoList(updatedTodoList);
    checkTodoListCompletion(updatedTodoList);
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
      // Mark the Todo List as completed
      setTodoList((prevTodoList) =>
        prevTodoList.map((task) => ({ ...task, completed: true }))
      );
    }
  };

  const uncompleteTodoList = () => {
    // Check if any task is still completed, if not, mark the Todo List as uncompleted
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
    return deadlineDate < currentDate;
  };

  return (
    <>
      {todoList.map((task) => (
        <tr key={task._id}>
          <td>
            {editedTask && editedTask._id === task._id ? (
              <input
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
          <td>
            {editedTask && editedTask._id === task._id ? (
              <input
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
          <td>
            {editedTask && editedTask._id === task._id ? (
              <input
                type="date"
                name="deadline"
                value={editedTask.deadline}
                onChange={(e) =>
                  setEditedTask((prev) => ({
                    ...prev,
                    deadline: e.target.value,
                  }))
                }
              />
            ) : (
              <p>{task.deadline}</p>
            )}
          </td>
          <td>
            {editedTask && editedTask._id === task._id ? (
              <>
                <button onClick={() => saveEditedTask(task._id)}>Save</button>
                <button onClick={() => setEditedTask(null)}>Cancel</button>
              </>
            ) : (
              <button onClick={() => editTask(task._id)}>Edit Task</button>
            )}
            <button onClick={() => deleteTask(task._id)}>Delete Task</button>

            <button
              onClick={() =>
                task.completed
                  ? uncompleteTask(task._id)
                  : completeTask(task._id)
              }
              disabled={isTaskExpired(task) || task.disabled}
            >
              {task.completed ? "Incomplete Task" : "Complete Task"}
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoItem;
