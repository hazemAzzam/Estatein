/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 * Favorites Schema - Favorites-related types and interfaces
 */

// Table favorites
export interface Favorites {
  id: string;
  user_id: string | null;
  property_id: string | null;
  created_at: Date | null;
}

export interface FavoritesInput {
  id?: string;
  user_id?: string | null;
  property_id?: string | null;
  created_at?: Date | null;
}

const favorites = {
  tableName: 'favorites',
  columns: ['id', 'user_id', 'property_id', 'created_at'],
  requiredForInsert: [],
  primaryKey: 'id',
  foreignKeys: {
    user_id: { table: 'users', column: 'id', $type: null as unknown as any },
    property_id: { table: 'properties', column: 'id', $type: null as unknown as any },
  },
  $type: null as unknown as Favorites,
  $input: null as unknown as FavoritesInput
} as const;

export { favorites };
