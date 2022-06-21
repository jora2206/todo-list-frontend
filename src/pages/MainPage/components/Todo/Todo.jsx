import React from 'react';
import {
  HStack,
  Input,
  Spacer,
  IconButton,
  FormControl,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
export function Todo({ todo, onDeleteTodo, onUpdateTodo }) {
  const [todoName, setTodoName] = useState(todo.task_name);
  async function onKeyDown(event) {
    if (event.key !== 'Enter') {
      return;
    }
    await onUpdateTodo({ ...todo, task_name: todoName });
  }

  return (
    <HStack>
      <FormControl>
        <Input
          placeholder="task name"
          value={todoName}
          onChange={(event) => setTodoName(event.target.value)}
          onKeyDown={onKeyDown}
        />
      </FormControl>

      <Spacer />
      <IconButton
        icon={<FaTrash />}
        onClick={(event) => {
          event.preventDefault();
          onDeleteTodo(todo);
        }}
      />
    </HStack>
  );
}
