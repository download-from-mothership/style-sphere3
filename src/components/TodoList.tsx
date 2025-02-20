// src/components/TodoList.tsx

'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';

interface Todo {
  // Define the structure of your todo item here
  id: number;
  title: string;
  // Add other fields as necessary
}

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const t = useTranslations('TodoList');

  return (
    <ul>
      {initialTodos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
