import { useState, useEffect } from "react";

import * as dateService from "../../services/dateService";

const TodoItem = ({ todoList, setTodoList }) => {
  // const [todoList, setTodoList] = useState([]);

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
          title: "Sample Task 1",
          description: "Description for Sample Task 1",
          deadline: dateService.formatDate(),
          completed: false,
        },
      ];
      setTodoList(sampleTodoList);
      localStorage.setItem("todoList", JSON.stringify(todoList));
    } else {
      setTodoList(storedTodoList);
    }
  }, []);

  const deleteTask = (taskId) => {
    const updatedTodoList = todoList.filter((task) => task._id !== taskId);
    setTodoList(updatedTodoList);
  };

  return (
    <>
      {todoList.map((task) => (
        <tr key={task._id}>
          <td>{task.title}</td>
          <td>{task.description}</td>
          <td>{task.deadline}</td>
          <td>
            <>
              <button>Save</button>
              <button>Cancel</button>
            </>
            <button>Edit Task</button>
            <button onClick={() => deleteTask(task._id)}>Delete Task</button>
            <button>Complete Task</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoItem;
