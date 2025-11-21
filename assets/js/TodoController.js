import ModalState from "./ModalState.js";
import Todo from "./Todo.js";

class TodoController {
  constructor(todoList, renderer) {
    this.todoList = todoList;
    this.renderer = renderer;
    this.modalState = new ModalState(".modal", "add-todo-button");

    this.form = document.querySelector(".modal-content form");
    this.titleInput = document.querySelector('input[placeholder="Todo Title"]');
    this.descriptionInput = document.querySelector(
      'input[placeholder="Todo Description"]'
    );
    this.deadlineInput = document.querySelector('input[name="deadline"]');
    this.prioritySelect = document.querySelector('select[name="priority"]');
    this.confirmModal = document.getElementById("confirm-modal");
    this.confirmBtn = document.getElementById("confirm-delete");
    this.cancelBtn = document.getElementById("cancel-delete");
  }
  init() {
    // Handle form submission
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
      this.todoList.addTodo(todo);
      this.renderer.render(this.todoList.getTodo());

      this.modalState.close();

      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.deadlineInput.value = "";
      this.prioritySelect.value = "low";
    });

    // Handle delete button
    this.listElement = document.getElementById("todo-list");
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("todo-action-delete")) {
        const todoId = e.target.getAttribute("data-todo-id");
        this.confirmModal.style.display = "flex";
        this.confirmBtn.addEventListener("click", () => {
          this.todoList.deleteTodo(todoId);
          this.renderer.render(this.todoList.getTodo());
          this.confirmModal.style.display = "none";
        });
        this.cancelBtn.addEventListener("click", () => {
          this.confirmModal.style.display = "none";
        });
      }
    });
  }
}

export default TodoController;
