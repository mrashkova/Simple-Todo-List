import React, { useState, useEffect } from "react";
import * as dateService from "../../services/dateService";

const TodoItem = ({ todoList, setTodoList }) => {
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem("todoList")) || [];

    if (storedTodoList.length === 0) {
      const sampleTodoList = [
        {
          _id: "b6fb91c4-ab0a-47fb-972b-e0ecf706f638",
          title: "Sample Task 1",
          description: "Description for Sample Task 1",
          deadline: dateService.formatDate(),
          completed: false,
        },
        {
          _id: "24f90006-5a1c-466c-b234-1518eca05dd6",
          title: "Sample Task 2",
          description: "Description for Sample Task 2",
          deadline: dateService.formatDate(),
          completed: false,
        },
      ];
      setTodoList(sampleTodoList);
    } else {
      setTodoList(storedTodoList);
    }
  }, [setTodoList]);

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
            <button>Complete Task</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoItem;
