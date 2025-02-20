// src/components/TodoList.tsx

'use client';

import * as React from 'react';

interface Todo {
  id: number;
  title: string;
}

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  return (
    <ul>
      {initialTodos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
