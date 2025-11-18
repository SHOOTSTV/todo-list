import ModalController from "./ModalState.js";
import TaskController from "./TaskController.js";
import TodoList from "./TodoList.js";
import TodoRender from "./TodoRender.js";

const todoList = new TodoList();
const todoRender = new TodoRender();

const taskController = new TaskController(todoList, todoRender);
taskController.init();

const modalController = new ModalController(".modal", "add-todo-button");
modalController.init();
