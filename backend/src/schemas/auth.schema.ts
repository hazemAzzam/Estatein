/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 * Auth Schema - User-related types and interfaces
 */

export type user_type_enum = 'admin' | 'agent' | 'buyer' | 'seller';

// Table users
export interface Users {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  user_type: user_type_enum | null;
  profile_image_url: string | null;
  is_verified: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface UsersInput {
  id?: string;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  user_type?: user_type_enum | null;
  profile_image_url?: string | null;
  is_verified?: boolean | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

const users = {
  tableName: 'users',
  columns: ['id', 'username', 'email', 'password_hash', 'first_name', 'last_name', 'phone', 'user_type', 'profile_image_url', 'is_verified', 'created_at', 'updated_at'],
  requiredForInsert: ['username', 'email', 'password_hash'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Users,
  $input: null as unknown as UsersInput
} as const;

export { users };
