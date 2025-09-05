/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 * Saved Searches Schema - Saved search-related types and interfaces
 */

export type Json = unknown;

// Table saved_searches
export interface SavedSearches {
  id: string;
  user_id: string | null;
  name: string;
  search_criteria: Json;
  created_at: Date | null;
}

export interface SavedSearchesInput {
  id?: string;
  user_id?: string | null;
  name: string;
  search_criteria: Json;
  created_at?: Date | null;
}

const saved_searches = {
  tableName: 'saved_searches',
  columns: ['id', 'user_id', 'name', 'search_criteria', 'created_at'],
  requiredForInsert: ['name', 'search_criteria'],
  primaryKey: 'id',
  foreignKeys: {
    user_id: { table: 'users', column: 'id', $type: null as unknown as any },
  },
  $type: null as unknown as SavedSearches,
  $input: null as unknown as SavedSearchesInput
} as const;

export { saved_searches };
