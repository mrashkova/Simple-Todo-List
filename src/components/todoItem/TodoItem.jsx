import { useState, useEffect } from "react";

import * as dateService from "../../services/dateService";

const TodoItem = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));

    if (todoList.length === 0) {
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
    }
  }, [todoList]);

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
            <button>Delete Task</button>
            <button>Complete Task</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoItem;
