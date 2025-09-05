/* tslint:disable */
/* eslint-disable */

/**
 * Schema Index - Export all schemas
 */

// Export all schema types and interfaces
export * from './auth.schema';
export * from './properties.schema';
export * from './inquiries.schema';
export * from './favorites.schema';
export * from './property-images.schema';
export * from './property-views.schema';
export * from './saved-searches.schema';

// Export common types
export type Json = unknown;
export type user_type_enum = 'admin' | 'agent' | 'buyer' | 'seller';
export type property_type_enum = 'apartment' | 'commercial' | 'condo' | 'house' | 'land' | 'townhouse';
export type property_status_enum = 'for_rent' | 'for_sale' | 'pending' | 'rented' | 'sold';
export type inquiry_type_enum = 'general' | 'offer' | 'question' | 'viewing_request';
export type inquiry_status_enum = 'closed' | 'pending' | 'responded';
