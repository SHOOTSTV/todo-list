class ProjectView {
  constructor() {
    this.listElement = document.querySelector(".sidebar-body");
  }

  render(projectList) {
    this.listElement.innerHTML = "";

    projectList.forEach((project) => {
      // Create the project item
      const projectItem = document.createElement("div");

      projectItem.className = "sidebar-body-item";

      const projectTitle = document.createElement("h3");
      const projectDeleteIcon = document.createElement("i");

      projectTitle.textContent = project.title;
      projectTitle.setAttribute("data-project-id", project.id);
      projectDeleteIcon.className = "fi fi-ss-trash";
      projectDeleteIcon.setAttribute("data-project-id", project.id);

      // Append elements to the project item (project icon, title)
      projectItem.appendChild(projectTitle);
      projectItem.appendChild(projectDeleteIcon);

      // Append project item to the list
      this.listElement.appendChild(projectItem);
    });
  }
}

export default ProjectView;
