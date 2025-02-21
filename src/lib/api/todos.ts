import { createClient } from "@supabase/supabase-js";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

const supabaseClient = createClient('your-supabase-url', 'your-anon-key');

export type Todo = Tables<"todos">;

export type TodoInsert = TablesInsert<"todos">;
export type TodoUpdate = TablesUpdate<"todos">;

export async function getTodos(): Promise<Todo[]> {
    const { data, error } = await supabaseClient
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error(`Error fetching todos: ${error.message}`);
        return [];
    }
    return data || [];
}

export async function updateTodo(id: number, todo: TodoUpdate): Promise<Todo> {
    const { data, error } = await supabaseClient
        .from("todos")
        .update(todo)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error(`Error updating todo with id ${id}: ${error.message}`);
        throw error;
    }
    return data as Todo;
}

export async function deleteTodo(id: number): Promise<boolean> {
    const { error } = await supabaseClient
        .from("todos")
        .delete()
        .eq("id", id);

    if (error) throw error;
    return true;
}

export async function createTodo(todo: TodoInsert): Promise<Todo> {
    const { data, error } = await supabaseClient
        .from("todos")
        .insert(todo)
        .select()
        .single();

    if (error) {
        console.error(`Error creating todo: ${error.message}`);
        throw error;
    }
    return data as Todo;
}
