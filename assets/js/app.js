import ModalController from "./ModalState.js";
import TaskController from "./TaskController.js";
import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import TodoRender from "./TodoRender.js";

const todoList = new TodoList();
const todoRender = new TodoRender();

// Todo template for debugging
const exampleTodo = new Todo(
  crypto.randomUUID(),
  "Example task",
  "This task is used to test and debug the application",
  "2024-12-31",
  "high"
);
todoList.addTodo(exampleTodo);

todoRender.render(todoList.getTodo());
const taskController = new TaskController(todoList, todoRender);
taskController.init();

const modalController = new ModalController(".modal", "add-todo-button");
modalController.init();
