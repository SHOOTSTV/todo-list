import ModalState from "./ModalState.js";
import Todo from "./Todo.js";

class TaskController {
  constructor(taskList, renderer) {
    this.taskList = taskList;
    this.renderer = renderer;
    this.modalState = new ModalState(".modal", "add-todo-button");

    this.form = document.querySelector(".modal-content form");
    this.titleInput = document.querySelector('input[placeholder="Todo Title"]');
    this.descriptionInput = document.querySelector(
      'input[placeholder="Todo Description"]'
    );
    this.deadlineInput = document.querySelector('input[name="deadline"]');
    this.prioritySelect = document.querySelector('select[name="priority"]');
  }
  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.titleInput.value.trim();
      const description = this.descriptionInput.value.trim();
      const deadline = this.deadlineInput.value.trim();
      const priority = this.prioritySelect.value.trim();

      const todo = new Todo(
        crypto.randomUUID(),
        title,
        description,
        deadline,
        priority
      );
      this.taskList.addTodo(todo);
      this.renderer.render(this.taskList.getTodo());

      this.modalState.close();

      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.deadlineInput.value = "";
      this.prioritySelect.value = "low";
    });
  }
}

export default TaskController;
