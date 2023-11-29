import React from "react";

const TodoListApp = () => {
  return (
    <div>
      <div>
        <h2>
          Todo List
          <button>Delete</button>
        </h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="date" />
              </td>
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
          </tbody>
        </table>
        <p>Todo List Completed:</p>
        <button>Add Task</button>
      </div>
    </div>
  );
};

export default TodoListApp;
