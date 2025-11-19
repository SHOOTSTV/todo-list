class TodoRender {
  constructor() {
    this.listElement = document.getElementById("todo-list");
  }

  render(todoList) {
    this.listElement.innerHTML = "";

    todoList.forEach((todo) => {
      // Create the card container
      const card = document.createElement("div");

      card.className = "todo-card";

      // Checkbox
      const checkboxLabel = document.createElement("label");
      const checkbox = document.createElement("input");
      const checkmarkSpan = document.createElement("span");

      checkboxLabel.className = "round-checkbox";
      checkbox.type = "checkbox";

      checkboxLabel.appendChild(checkbox);
      checkboxLabel.appendChild(checkmarkSpan);

      // Content block
      const content = document.createElement("div");
      const title = document.createElement("h3");
      const description = document.createElement("p");
      const meta = document.createElement("div");
      const date = document.createElement("span");
      const priority = document.createElement("span");

      content.className = "todo-content";
      title.className = "todo-title";
      title.textContent = todo.title;
      description.className = "todo-description";
      description.textContent = todo.description || "";
      meta.className = "todo-meta";
      date.className = "todo-date";
      date.textContent = "Deadline : " + todo.deadline;
      priority.className = `priority-${todo.priority.toLowerCase()}`;
      priority.textContent = "Priority : " + todo.priority;

      meta.appendChild(date);
      meta.appendChild(priority);
      content.appendChild(title);
      content.appendChild(description);
      content.appendChild(meta);

      // Actions (edit, delete)
      const actions = document.createElement("div");
      const editIcon = document.createElement("i");
      const deleteIcon = document.createElement("i");

      actions.className = "todo-actions";
      editIcon.className = "fi fi-ss-pencil todo-action-edit";
      deleteIcon.className = "fi fi-ss-trash todo-action-delete";
      deleteIcon.setAttribute("data-todo-id", todo.id);

      actions.appendChild(editIcon);
      actions.appendChild(deleteIcon);

      // Append elements to the card (checkbox, content, actions)
      card.appendChild(checkboxLabel);
      card.appendChild(content);
      card.appendChild(actions);

      // Append card to the list
      this.listElement.appendChild(card);
    });
  }
}

export default TodoRender;
