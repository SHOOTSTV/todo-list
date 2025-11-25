class ProjectModel {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  deleteProject(idToDelete) {
    this.projects = this.projects.filter(
      (project) => project.id !== idToDelete
    );
  }

  getProjects() {
    return this.projects;
  }
}

export default ProjectModel;
