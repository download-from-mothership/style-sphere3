// src/app/page.tsx

import { cookies } from 'next/headers'
import { createServerClientInstance } from '@/utils/supabase/server'
import TodoList from '@/components/TodoList'

export default async function Page() {
  const supabaseClient = await createServerClientInstance(cookies())

  const { data: todos } = await supabaseClient.from('todos').select()

  return <TodoList initialTodos={todos || []} />
}

