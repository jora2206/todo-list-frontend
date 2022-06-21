import { axiosClient } from './axios';

export async function login(email, password) {
  // TODO: ask backend
  return await axiosClient.post('/login', {
    email,
    password,
  });
}

export async function signUp(email, password) {
  return await axiosClient.post('/user', {
    email,
    password,
  });
}

export function addItemToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}
