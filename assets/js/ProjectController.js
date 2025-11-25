import ModalState from "./ModalState.js";
import Project from "./Project.js";

class ProjectController {
  constructor(projectModel, projectView, todoController) {
    this.projectModel = projectModel;
    this.projectView = projectView;
    this.todoController = todoController;
    this.modalState = new ModalState(".modal-project", "add-project-button");
    this.form = document.querySelector(".modal-project form");
    this.titleInput = document.querySelector(
      'input[placeholder="Project Title"]'
    );
    this.modalTitle = document.querySelector(
      ".modal-project .modal-content h2"
    );
    this.modalButton = document.querySelector(".modal-project form button");
    this.cancelProjectBtn = document.getElementById("cancel-project-button");
    this.confirmModal = document.getElementById("confirm-project-modal");
    this.confirmBtn = document.getElementById("confirm-project-delete");
    this.cancelBtn = document.getElementById("cancel-project-delete");
    this.projectToDelete = null;
  }

  init() {
    // Handle form submission for creating new projects
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = this.titleInput.value.trim();

      if (title) {
        const project = new Project(crypto.randomUUID(), title, []);
        this.projectModel.addProject(project);
        this.projectView.render(this.projectModel.getProjects());
        this.modalState.close();
        this.titleInput.value = "";
      }
    });

    // Handle cancel button
    this.cancelProjectBtn.addEventListener("click", () => {
      this.modalState.close();
      this.titleInput.value = "";
    });

    // Handle click on a project to display its todos
    const sidebarBody = document.querySelector(".sidebar-body");
    sidebarBody.addEventListener("click", (e) => {
      // Handle delete button click
      if (e.target.classList.contains("fi-ss-trash")) {
        const projectId = e.target.getAttribute("data-project-id");
        if (projectId) {
          this.projectToDelete = projectId;
          this.confirmModal.style.display = "flex";
        }
        return;
      }

      const projectItem = e.target.closest(".sidebar-body-item");
      if (projectItem) {
        const projectTitle = projectItem.querySelector("h3");
        if (projectTitle) {
          const projectId = projectTitle.getAttribute("data-project-id");
          if (projectId) {
            this.todoController.setCurrentProject(projectId);
          }
        }
      }
    });

    // Handle confirm delete button
    this.confirmBtn.addEventListener("click", () => {
      if (this.projectToDelete) {
        // Check if the project being deleted is the currently selected one
        const currentProjectId = this.todoController.currentProjectId;
        if (currentProjectId === this.projectToDelete) {
          this.todoController.setCurrentProject(null);
        }

        // Delete all todos associated with this project
        this.todoController.deleteTodosByProject(this.projectToDelete);

        // Delete the project
        this.projectModel.deleteProject(this.projectToDelete);
        this.projectView.render(this.projectModel.getProjects());

        // Close the modal and reset
        this.confirmModal.style.display = "none";
        this.projectToDelete = null;
      }
    });

    // Handle cancel delete button
    this.cancelBtn.addEventListener("click", () => {
      this.confirmModal.style.display = "none";
      this.projectToDelete = null;
    });
  }
}

export default ProjectController;
