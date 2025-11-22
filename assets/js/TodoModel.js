class TodoModel {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  deleteTodo(idToDelete) {
    this.todos = this.todos.filter((todo) => todo.id !== idToDelete);
  }

  getTodo() {
    return this.todos;
  }
}

export default TodoModel;
