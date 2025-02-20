// src/app/page.tsx

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import TodoList from '@/components/TodoList'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return <TodoList initialTodos={todos || []} />
}

