export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_schedules: {
        Row: {
          created_at: string
          description: string | null
          id: number
          is_publish: boolean
          public_url: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          is_publish?: boolean
          public_url?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          is_publish?: boolean
          public_url?: string | null
          title?: string
        }
        Relationships: []
      }
      class_schedules: {
        Row: {
          created_at: string
          id: number
          level: string
          public_url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          level: string
          public_url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          level?: string
          public_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_schedule_level_fkey"
            columns: ["level"]
            isOneToOne: true
            referencedRelation: "levels"
            referencedColumns: ["level_code"]
          },
        ]
      }
      college_calendar: {
        Row: {
          created_at: string
          id: number
          public_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          public_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          public_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      faq: {
        Row: {
          answer: string
          created_at: string
          id: number
          is_active: boolean
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: number
          is_active?: boolean
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          is_active?: boolean
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      groups: {
        Row: {
          created_at: string
          gid: string
          id: number
          image: string
          name: string
        }
        Insert: {
          created_at?: string
          gid: string
          id?: number
          image: string
          name: string
        }
        Update: {
          created_at?: string
          gid?: string
          id?: number
          image?: string
          name?: string
        }
        Relationships: []
      }
      levels: {
        Row: {
          created_at: string
          id: number
          level_code: string
          level_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          level_code: string
          level_name: string
        }
        Update: {
          created_at?: string
          id?: number
          level_code?: string
          level_name?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          code: string
          created_at: string
          email: string
          id: number
          level: string
          line_uid: string
          name: string
          phone_no: string
        }
        Insert: {
          code: string
          created_at?: string
          email: string
          id?: number
          level: string
          line_uid: string
          name: string
          phone_no: string
        }
        Update: {
          code?: string
          created_at?: string
          email?: string
          id?: number
          level?: string
          line_uid?: string
          name?: string
          phone_no?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_level_fkey"
            columns: ["level"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["level_code"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
