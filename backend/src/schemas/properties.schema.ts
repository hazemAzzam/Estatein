/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 * Properties Schema - Property-related types and interfaces
 */

export type property_type_enum = 'apartment' | 'commercial' | 'condo' | 'house' | 'land' | 'townhouse';
export type property_status_enum = 'for_rent' | 'for_sale' | 'pending' | 'rented' | 'sold';

// Table properties
export interface Properties {
  id: string;
  owner_id: string | null;
  agent_id: string | null;
  title: string;
  description: string | null;
  property_type: property_type_enum;
  status: property_status_enum | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  lot_size: number | null;
  year_built: number | null;
  price: number | null;
  rent_amount: number | null;
  price_per_sqft: number | null;
  features: string[] | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface PropertiesInput {
  id?: string;
  owner_id?: string | null;
  agent_id?: string | null;
  title: string;
  description?: string | null;
  property_type: property_type_enum;
  status?: property_status_enum | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  square_feet?: number | null;
  lot_size?: number | null;
  year_built?: number | null;
  price?: number | null;
  rent_amount?: number | null;
  price_per_sqft?: number | null;
  features?: string[] | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

const properties = {
  tableName: 'properties',
  columns: ['id', 'owner_id', 'agent_id', 'title', 'description', 'property_type', 'status', 'address', 'city', 'state', 'zip_code', 'country', 'latitude', 'longitude', 'bedrooms', 'bathrooms', 'square_feet', 'lot_size', 'year_built', 'price', 'rent_amount', 'price_per_sqft', 'features', 'created_at', 'updated_at'],
  requiredForInsert: ['title', 'property_type', 'address', 'city', 'state', 'zip_code'],
  primaryKey: 'id',
  foreignKeys: {
    owner_id: { table: 'users', column: 'id', $type: null as unknown as any },
    agent_id: { table: 'users', column: 'id', $type: null as unknown as any },
  },
  $type: null as unknown as Properties,
  $input: null as unknown as PropertiesInput
} as const;

export { properties };
