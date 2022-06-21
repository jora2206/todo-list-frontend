export class LocalTodoStorage {
  constructor() {
    this.checkLocalStorage();
  }

  localStorageKey = 'todos';

  async addTodo(todoName) {
    const todos = JSON.parse(
      localStorage.getItem(this.localStorageKey),
    );
    todos.unshift({
      id: Math.random(),
      task_name: todoName,
    });
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  async getAllTodos() {
    const allTodos = JSON.parse(
      localStorage.getItem(this.localStorageKey),
    );
    return allTodos;
  }

  async deleteTodo(todo) {
    const todos = JSON.parse(
      localStorage.getItem(this.localStorageKey),
    );
    const foundIndex = todos.findIndex(
      (currentTodo) => currentTodo.id === todo.id,
    ); // TODO: migrate to objects for RemoteLocalStorage

    if (foundIndex === -1) {
      return;
    }

    todos.splice(foundIndex, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  async updateTodo(todo) {
    const todos = JSON.parse(
      localStorage.getItem(this.localStorageKey),
    );
    const foundIndex = todos.findIndex(
      (currentTodo) => currentTodo.id === todo.id,
    ); // TODO: migrate to objects for RemoteLocalStorage

    if (foundIndex === -1) {
      return;
    }

    todos[foundIndex] = todo;
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  checkLocalStorage() {
    const result = localStorage.getItem(this.localStorageKey);
    if (!result) {
      localStorage.setItem(this.localStorageKey, JSON.stringify([]));
    }
  }
}
