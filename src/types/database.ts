/* eslint-disable @typescript-eslint/no-explicit-any */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface DatabaseSchema {
  graphql_public: {
    Tables: {
      [_: string]: never;
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      todos: {
        Row: {
          created_at: string
          done: boolean | null
          id: number
          label: string | null
        }
        Insert: {
          created_at?: string
          done?: boolean | null
          id?: number
          label?: string | null
        }
        Update: {
          created_at?: string
          done?: boolean | null
          id?: number
          label?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = DatabaseSchema[Extract<keyof DatabaseSchema, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof DatabaseSchema },
  TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseSchema }
    ? keyof (DatabaseSchema[PublicTableNameOrOptions["schema"]] extends { Tables: any, Views: any }
        ? DatabaseSchema[PublicTableNameOrOptions["schema"]]["Tables"] &
          DatabaseSchema[PublicTableNameOrOptions["schema"]]["Views"]
        : never)
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof DatabaseSchema }
  ? (DatabaseSchema[PublicTableNameOrOptions["schema"]] extends { Tables: any, Views: any }
      ? DatabaseSchema[PublicTableNameOrOptions["schema"]]["Tables"] &
        DatabaseSchema[PublicTableNameOrOptions["schema"]]["Views"]
      : never)[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof DatabaseSchema },
  TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseSchema }
    ? keyof DatabaseSchema[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseSchema }
  ? (DatabaseSchema[PublicTableNameOrOptions["schema"]] extends { Tables: any }
      ? DatabaseSchema[PublicTableNameOrOptions["schema"]]["Tables"]
      : never)[TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof DatabaseSchema },
  TableName extends PublicTableNameOrOptions extends { schema: keyof DatabaseSchema }
    ? keyof DatabaseSchema[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof DatabaseSchema }
  ? DatabaseSchema[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof DatabaseSchema },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof DatabaseSchema }
    ? keyof DatabaseSchema[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof DatabaseSchema }
  ? DatabaseSchema[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof DatabaseSchema },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseSchema
  }
    ? DatabaseSchema[PublicCompositeTypeNameOrOptions["schema"]] extends { CompositeTypes: infer CT }
      ? keyof CT
      : never
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseSchema }
  ? DatabaseSchema[PublicCompositeTypeNameOrOptions["schema"]] extends { CompositeTypes: infer CT }
    ? CT[CompositeTypeName]
    : never
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

