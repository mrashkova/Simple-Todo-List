import { v4 as uuidv4 } from "uuid";
import * as dateService from "../services/dateService";

export const sampleTodoList = [
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
