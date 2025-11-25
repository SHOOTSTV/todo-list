import ModalState from "./ModalState.js";
import Project from "./Project.js";
import ProjectController from "./ProjectController.js";
import ProjectModel from "./ProjectModel.js";
import ProjectView from "./ProjectView.js";
import Todo from "./Todo.js";
import TodoController from "./TodoController.js";
import TodoModel from "./TodoModel.js";
import TodoView from "./TodoView.js";

// Initialize models, controllers and views
const todoModel = new TodoModel();
const todoView = new TodoView();
const projectModel = new ProjectModel();
const projectView = new ProjectView();

// Project templates for debugging
const exampleProjectId1 = crypto.randomUUID();
const exampleProjectId2 = crypto.randomUUID();

const exampleProject = new Project(exampleProjectId1, "project 1", []);
const exampleProject2 = new Project(exampleProjectId2, "project 2", []);

// Todo templates for debugging
const exampleTodo = new Todo(
  crypto.randomUUID(),
  "Example task",
  "This task is used to test and debug the application",
  "2024-12-31",
  "high",
  exampleProjectId1
);

const exampleTodo2 = new Todo(
  crypto.randomUUID(),
  "Example task 2",
  "This task is used to test and debug the application",
  "2024-12-31",
  "low",
  exampleProjectId2
);

// Add todos to projects
exampleProject.todos.push(exampleTodo);
exampleProject2.todos.push(exampleTodo2);

// Add todos to todo model
todoModel.addTodo(exampleTodo);
todoModel.addTodo(exampleTodo2);

// Add projects to project model
projectModel.addProject(exampleProject);
projectModel.addProject(exampleProject2);

// Render projects
projectView.render(projectModel.getProjects());

// Initialize todo controller
const todoController = new TodoController(todoModel, todoView, projectModel);
todoController.init();

// Initialize project controller
const projectController = new ProjectController(
  projectModel,
  projectView,
  todoController
);
projectController.init();

// Initialize modal controller for todos
const modalTodoController = new ModalState(".modal", "add-todo-button");
modalTodoController.init();

// Initialize modal controller for projects
const modalProjectController = new ModalState(
  ".modal-project",
  "add-project-button"
);
modalProjectController.init();

// Open the first available project by default
const projects = projectModel.getProjects();
if (projects.length > 0) {
  todoController.setCurrentProject(projects[0].id);
}
