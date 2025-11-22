import ModalState from "./ModalState.js";
import Todo from "./Todo.js";

class TodoController {
  constructor(todoModel, renderer) {
    this.todoModel = todoModel;
    this.renderer = renderer;
    this.modalState = new ModalState(".modal", "add-todo-button");
    this.editingTodoId = null;

    this.form = document.querySelector(".modal-content form");
    this.titleInput = document.querySelector('input[placeholder="Todo Title"]');
    this.descriptionInput = document.querySelector(
      'input[placeholder="Todo Description"]'
    );
    this.deadlineInput = document.querySelector('input[name="deadline"]');
    this.prioritySelect = document.querySelector('select[name="priority"]');
    this.modalTitle = document.querySelector(".modal-content h2");
    this.modalButton = document.querySelector(".modal-content form button");
    this.confirmModal = document.getElementById("confirm-modal");
    this.confirmBtn = document.getElementById("confirm-delete");
    this.cancelBtn = document.getElementById("cancel-delete");
  }
  init() {
    // Reset form to create mode when opening modal via "Add Todo" button
    const addTodoButton = document.getElementById("add-todo-button");
    addTodoButton.addEventListener("click", () => {
      this.editingTodoId = null;
      this.modalTitle.textContent = "Add a New Todo :";
      this.modalButton.textContent = "Add Todo";

      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.deadlineInput.value = "";
      this.prioritySelect.value = "low";
    });

    // Handle form submission (unified for both create and update)
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.titleInput.value.trim();
      const description = this.descriptionInput.value.trim();
      const deadline = this.deadlineInput.value.trim();
      const priority = this.prioritySelect.value.trim();

      if (this.editingTodoId) {
        // Update existing todo
        this.todoModel.updateTodo(
          this.editingTodoId,
          title,
          description,
          deadline,
          priority
        );
        this.editingTodoId = null;
        this.modalTitle.textContent = "Add a New Todo :";
        this.modalButton.textContent = "Add Todo";
      } else {
        // Create new todo
        const todo = new Todo(
          crypto.randomUUID(),
          title,
          description,
          deadline,
          priority
        );
        this.todoModel.addTodo(todo);
      }

      this.renderer.render(this.todoModel.getTodos());
      this.modalState.close();

      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.deadlineInput.value = "";
      this.prioritySelect.value = "low";
    });

    this.todoListElement = document.getElementById("todo-list");
    this.todoListElement.addEventListener("click", (e) => {
      // Handle delete button
      if (e.target.classList.contains("todo-action-delete")) {
        const todoId = e.target.getAttribute("data-todo-id");
        this.confirmModal.style.display = "flex";

        this.confirmBtn.addEventListener("click", () => {
          this.todoModel.deleteTodo(todoId);
          this.renderer.render(this.todoModel.getTodos());
          this.confirmModal.style.display = "none";
        });
        this.cancelBtn.addEventListener("click", () => {
          this.confirmModal.style.display = "none";
        });
      }
      // Handle edit button
      else if (e.target.classList.contains("todo-action-edit")) {
        const todoId = e.target.getAttribute("data-todo-id");
        this.editingTodoId = todoId;
        // Change the modal title to "Edit Todo"
        this.modalTitle.textContent = "Edit Todo :";
        // Change the modal button text to "Update Todo"
        this.modalButton.textContent = "Update Todo";

        const todos = this.todoModel.getTodos();
        const todoToEdit = todos.find((todo) => todo.id === todoId);
        if (todoToEdit) {
          this.titleInput.value = todoToEdit.title;
          this.descriptionInput.value = todoToEdit.description || "";
          this.deadlineInput.value = todoToEdit.deadline;
          this.prioritySelect.value = todoToEdit.priority;
        }
        this.modalState.open();
      }
    });
  }
}

export default TodoController;
