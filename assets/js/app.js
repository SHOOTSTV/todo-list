import ModalController from "./ModalState.js";
import Todo from "./Todo.js";
import TodoController from "./TodoController.js";
import TodoModel from "./TodoModel.js";
import TodoView from "./todoView.js";

const todoModel = new TodoModel();
const todoView = new TodoView();

// Todo template for debugging
const exampleTodo = new Todo(
  crypto.randomUUID(),
  "Example task",
  "This task is used to test and debug the application",
  "2024-12-31",
  "high"
);
todoModel.addTodo(exampleTodo);

todoView.render(todoModel.getTodo());
const todoController = new TodoController(todoModel, todoView);
todoController.init();

const modalController = new ModalController(".modal", "add-todo-button");
modalController.init();
