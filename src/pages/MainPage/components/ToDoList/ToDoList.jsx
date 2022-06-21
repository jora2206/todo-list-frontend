import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Heading,
  HStack,
  Input,
  StackDivider,
  VStack,
  Spacer,
  IconButton,
  Field,
  Form,
  FormControl,
} from '@chakra-ui/react';
import { GrCheckboxSelected } from 'react-icons/gr';
import { LocalTodoStorage } from '../../../../todo-storages/local-todo-storage';
import { RemoteTodoStorage } from '../../../../todo-storages/remote-todo-storage';
import { Todo } from '../Todo/Todo';

export function ToDoList() {
  const [todoStorage] = useState(new LocalTodoStorage());
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchAllTodos();
  }, []);

  async function onUpdateTodo(todo) {
    await todoStorage.updateTodo(todo);
    await fetchAllTodos();
  }

  async function onDeleteTodo(todo) {
    await todoStorage.deleteTodo(todo);
    await fetchAllTodos();
  }

  async function onAddTodo(todo) {
    await todoStorage.addTodo(todo);
    await fetchAllTodos();
  }

  async function fetchAllTodos() {
    const todos = await todoStorage.getAllTodos();

    setTodos(todos);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.todo_task) {
      errors.todo_task = 'This field is required';
    } else if (values.todo_task.length < 2) {
      errors.todo_task = 'Task is to short';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      todo_task: '',
    },
    validate,
    onSubmit: async (values) => {
      await onAddTodo(values.todo_task);
    },
  });

  return (
    <VStack>
      <Heading
        mb="8"
        fontWeight="extrabold"
        size="2xl"
        background="blue.500"
        bgClip="text"
      >
        Todo List
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <HStack>
          <Input
            variant="filled"
            placeholder="Add your task"
            name="todo_task"
            id="todo_task"
            onChange={formik.handleChange}
            value={formik.values.todo_task}
          />
          {formik.errors.todo_task ? (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {formik.errors.todo_task}
            </div>
          ) : null}
          <Button
            colorScheme="blue"
            px="8"
            type="submit"
            disabled={!formik.isValid}
          >
            Add ToDo
          </Button>
        </HStack>
      </form>
      <VStack
        divider={<StackDivider />}
        orderColor="gray.100"
        borderWidth="2px"
        p="4"
        borderRadius="lg"
        w="100%"
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        alignItems="stretch"
      >
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </VStack>
    </VStack>
  );
}
