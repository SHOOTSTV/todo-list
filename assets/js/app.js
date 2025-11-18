import TaskController from "./TaskController.js";
import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import TodoRender from "./TodoRender.js";

const todoList = new TodoList();
const todoRender = new TodoRender();
const todo1 = new Todo(
  crypto.randomUUID(),
  "Task 1",
  "Description 1",
  "2025-11-16",
  "High"
);

const todo2 = new Todo(
  crypto.randomUUID(),
  "Task 2",
  "Dsqdqsdqij",
  "2025-11-16",
  "Medium"
);

const taskController = new TaskController(todoList, todoRender);
taskController.init();
