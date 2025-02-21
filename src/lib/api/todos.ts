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

    if (error) throw error;
    return data;
}

export async function createTodo(todo: TodoInsert): Promise<Todo> {
    const { data, error } = await supabaseClient
        .from("todos")
        .insert(todo)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateTodo(id: number, todo: TodoUpdate): Promise<Todo> {
    const { data, error } = await supabaseClient
        .from("todos")
        .update(todo)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteTodo(id: number): Promise<boolean> {
    const { error } = await supabaseClient
        .from("todos")
        .delete()
        .eq("id", id);

    if (error) throw error;
    return true;
}

// async function insertTodo() {
//   const newTodo: TodoInsert = {
//     label: "New Task",
//     done: false
//   };

//   const { data, error } = await supabaseClient
//     .from('todos')
//     .insert([newTodo]);

//   if (error) {
//     console.error("Error inserting todo:", error);
//   } else {
//     console.log("Inserted todo:", data);
//   }
// } // This closing bracket is unnecessary and should be removed

// insertTodo(); // This line is commented out and can be removed if not needed
