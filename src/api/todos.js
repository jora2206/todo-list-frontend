import { axiosClient } from './axios';

export async function addTodo(todoName) {
  // TODO: ask backend
  return await axiosClient.post('/task', {
    task_name: todoName,
  });
}

export async function deleteTodo(todo) {
  // TODO: ask backend
  console.log(todo);
  return await axiosClient.delete(`/task/?task_id=${todo.id}`);
}

export async function getAllTodos() {
  // TODO: ask backend
  return await axiosClient.get('/task');
}

export async function updateTodo(todo) {
  // TODO: ask backend
  return await axiosClient.put(`/task/?task_id=${todo.id}`, {
    task_name: todo.task_name,
    completeness: false,
  });
}
