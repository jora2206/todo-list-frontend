import {
  addTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from '../api/todos';

export class RemoteTodoStorage {
  async addTodo(todoName) {
    await addTodo(todoName);
  }

  async getAllTodos() {
    const response = await getAllTodos();
    return response.data;
  }

  async deleteTodo(todo) {
    await deleteTodo(todo);
  }

  async updateTodo(todo) {
    await updateTodo(todo);
  }
}
