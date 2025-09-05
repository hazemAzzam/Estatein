/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 * Property Images Schema - Property image-related types and interfaces
 */

// Table property_images
export interface PropertyImages {
  id: string;
  property_id: string | null;
  image_url: string;
  image_order: number | null;
  is_primary: boolean | null;
  created_at: Date | null;
}

export interface PropertyImagesInput {
  id?: string;
  property_id?: string | null;
  image_url: string;
  image_order?: number | null;
  is_primary?: boolean | null;
  created_at?: Date | null;
}

const property_images = {
  tableName: 'property_images',
  columns: ['id', 'property_id', 'image_url', 'image_order', 'is_primary', 'created_at'],
  requiredForInsert: ['image_url'],
  primaryKey: 'id',
  foreignKeys: {
    property_id: { table: 'properties', column: 'id', $type: null as unknown as any },
  },
  $type: null as unknown as PropertyImages,
  $input: null as unknown as PropertyImagesInput
} as const;

export { property_images };
