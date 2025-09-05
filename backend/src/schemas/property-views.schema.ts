/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 * Property Views Schema - Property view-related types and interfaces
 */

// Table property_views
export interface PropertyViews {
  id: string;
  property_id: string | null;
  user_id: string | null;
  ip_address: string | null;
  viewed_at: Date | null;
}

export interface PropertyViewsInput {
  id?: string;
  property_id?: string | null;
  user_id?: string | null;
  ip_address?: string | null;
  viewed_at?: Date | null;
}

const property_views = {
  tableName: 'property_views',
  columns: ['id', 'property_id', 'user_id', 'ip_address', 'viewed_at'],
  requiredForInsert: [],
  primaryKey: 'id',
  foreignKeys: {
    property_id: { table: 'properties', column: 'id', $type: null as unknown as any },
    user_id: { table: 'users', column: 'id', $type: null as unknown as any },
  },
  $type: null as unknown as PropertyViews,
  $input: null as unknown as PropertyViewsInput
} as const;

export { property_views };
