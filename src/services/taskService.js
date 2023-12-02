import * as dateService from "../services/dateService";

// Edit
export const editTask = (taskId, todoList, setEditedTask) => {
  const taskToEdit = todoList.find((task) => task._id === taskId);

  const formattedDeadline = dateService.formatDate(
    new Date(taskToEdit.deadline),
    "MM/dd/yyyy"
  );

  setEditedTask({
    ...taskToEdit,
    deadline: formattedDeadline,
  });
};

// Save the editted task
export const saveEditedTask = (
  taskId,
  todoList,
  setTodoList,
  editedTask,
  setEditedTask
) => {
  const updatedTodoList = todoList.map((task) =>
    task._id === taskId ? { ...task, ...editedTask } : task
  );

  setTodoList(updatedTodoList);
  completeTodoList(updatedTodoList);
  setEditedTask(null);
};

// Delete
export const deleteTask = (taskId, todoList, setTodoList) => {
  const updatedTodoList = todoList.filter((task) => task._id !== taskId);
  setTodoList(updatedTodoList);
};

// Check if the task es expired and disable the Status button
export const isTaskExpired = (task) => {
  const deadlineDate = new Date(task.deadline);
  const currentDate = new Date();

  return (
    (deadlineDate.getFullYear() === currentDate.getFullYear() &&
      deadlineDate.getMonth() === currentDate.getMonth() &&
      deadlineDate.getDate() < currentDate.getDate()) ||
    task.disabled
  );
};

// Check if the task is completed and update
export const completeTask = (taskId, todoList, setTodoList) => {
  const taskToComplete = todoList.find((task) => task._id === taskId);

  if (!isTaskExpired(taskToComplete)) {
    const updatedTodoList = todoList.map((task) =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTodoList(updatedTodoList);
    setTodoList(completeTodoList(updatedTodoList, setTodoList));
  } else {
    const updatedTodoList = todoList.map((task) =>
      task._id === taskId
        ? {
            ...task,
            completed: false,
          }
        : task
    );

    setTodoList(updatedTodoList);
    setTodoList(completeTodoList(updatedTodoList, setTodoList));
  }
};

// Check if the task is uncompleted and update
export const uncompleteTask = (taskId, todoList, setTodoList) => {
  const updatedTodoList = todoList.map((task) =>
    task._id === taskId && task.completed ? { ...task, completed: false } : task
  );

  setTodoList(updatedTodoList);
  uncompleteTodoList(updatedTodoList);
};

// Check if the todo list is completed
export const completeTodoList = (updatedTodoList) => {
  const allCompleted = updatedTodoList.every((task) => task.completed);
  if (allCompleted) {
    return updatedTodoList.map((task) => ({ ...task, completed: true }));
  }
  return updatedTodoList;
};

const uncompleteTodoList = (updatedTodoList) => {
  const anyTaskCompleted = updatedTodoList.some((task) => task.completed);
  if (!anyTaskCompleted) {
    return updatedTodoList.map((task) => ({ ...task, completed: false }));
  }
  return updatedTodoList;
};
