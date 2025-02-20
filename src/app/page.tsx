'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import LayoutSidebar from '@/components/layout-sidebar';
import { useTranslations } from 'next-intl';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  )
}
