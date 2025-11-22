class TodoModel {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  updateTodo(idToUpdate, title, description, deadline, priority) {
    const index = this.todos.findIndex((todo) => todo.id === idToUpdate);
    if (index !== -1) {
      this.todos[index].title = title;
      this.todos[index].description = description;
      this.todos[index].deadline = deadline;
      this.todos[index].priority = priority;
    }
  }

  deleteTodo(idToDelete) {
    this.todos = this.todos.filter((todo) => todo.id !== idToDelete);
  }

  getTodos() {
    return this.todos;
  }
}

export default TodoModel;
