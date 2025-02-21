import supabaseClient from "@/lib/supabase-client";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database";

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
    return data ? (data as unknown as Todo[]) : [];

}

export async function updateTodo(id: number, todo: TodoUpdate): Promise<Todo> {
    const { data, error } = await supabaseClient
        .from("todos")
        .update(todo as any)
        .eq("id", id as any)
        .select()
        .single();

    if (error) {
        console.error(`Error updating todo with id ${id}: ${error.message}`);
        throw error;
    }
    return data as unknown as Todo;
}

export async function deleteTodo(id: number): Promise<boolean> {
    const { error } = await supabaseClient
        .from("todos")
        .delete()
        .eq("id", id as any);

    if (error) throw error;
    return true;


function from(arg0: string) {
    throw new Error("Function not implemented.");
}
}
