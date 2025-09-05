import { Properties, PropertiesInput } from '../schemas/properties.schema';
import { PropertiesRepository } from './properties.repository';
import { Database } from '../lib/db';
import { sql } from 'bun';

export interface PropertyFilters {
  property_type?: string;
  status?: string;
  city?: string;
  state?: string;
  min_price?: number;
  max_price?: number;
  min_rent?: number;
  max_rent?: number;
  bedrooms?: number;
  bathrooms?: number;
  min_sqft?: number;
  max_sqft?: number;
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PropertyListResult {
  properties: Properties[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createProperty(propertyData: PropertiesInput): Promise<Properties> {
  return await PropertiesRepository.create(propertyData);
}

export async function getPropertyById(id: string): Promise<Properties | null> {
  return await PropertiesRepository.findById(id);
}

export async function updateProperty(id: string, propertyData: Partial<PropertiesInput>): Promise<Properties | null> {
  return await PropertiesRepository.update(id, propertyData);
}

export async function deleteProperty(id: string): Promise<boolean> {
  return await PropertiesRepository.delete(id);
}

export async function getProperties(
  filters: PropertyFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
): Promise<PropertyListResult> {
  const { page, limit } = pagination;
  const result = await PropertiesRepository.findWithFiltersAndPagination(filters, pagination);
  
  return {
    properties: result.properties,
    total: result.total,
    page,
    limit,
    totalPages: Math.ceil(result.total / limit)
  };
}

export async function getPropertiesByOwner(ownerId: string): Promise<Properties[]> {
  return await PropertiesRepository.findByOwnerId(ownerId);
}

export async function getPropertiesByAgent(agentId: string): Promise<Properties[]> {
  return await PropertiesRepository.findByAgentId(agentId);
}