import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createTodo,
    deleteTodo,
    getTodos,
    TodoInsert,
    TodoUpdate,
    updateTodo,
} from "./todos";
import { useToast } from "@/hooks/use-toast";

export function useTodos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: () => getTodos(),
    });
}

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (todo: TodoInsert) => createTodo(todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({
                title: "Success",
                description: "Todo created successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}

export function useUpdateTodo() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, todo }: { id: number; todo: TodoUpdate }) =>
            updateTodo(id, todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({
                title: "Success",
                description: "Todo updated successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}

export function useDeleteTodo() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast({
                title: "Success",
                description: "Todo deleted successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });
}
