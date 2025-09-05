import { SavedSearches, SavedSearchesInput } from '../schemas/saved-searches.schema';
import { SavedSearchesRepository } from './saved-searches.repository';
import { Database } from '../lib/db';

export interface SavedSearchFilters {
  user_id?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SavedSearchListResult {
  savedSearches: SavedSearches[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createSavedSearch(savedSearchData: SavedSearchesInput): Promise<SavedSearches> {
  return await SavedSearchesRepository.create(savedSearchData);
}

export async function getSavedSearchById(id: string): Promise<SavedSearches | null> {
  return await SavedSearchesRepository.findById(id);
}

export async function updateSavedSearch(id: string, savedSearchData: Partial<SavedSearchesInput>): Promise<SavedSearches | null> {
  return await SavedSearchesRepository.update(id, savedSearchData);
}

export async function deleteSavedSearch(id: string): Promise<boolean> {
  return await SavedSearchesRepository.delete(id);
}

export async function getSavedSearches(
  filters: SavedSearchFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
): Promise<SavedSearchListResult> {
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;
  
  // Build WHERE conditions
  const whereConditions = [];
  const values = [];
  
  if (filters.user_id) {
    whereConditions.push(`user_id = $${values.length + 1}`);
    values.push(filters.user_id);
  }
  
  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
  
  // Get total count
  const countResult = await Database.sql`
    SELECT COUNT(*) as total FROM saved_searches ${whereClause};
  `;
  const total = countResult.total;
  
  // Get saved searches
  const savedSearchesList = await Database.sql`
    SELECT * FROM saved_searches 
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset};
  `;
  
  return {
    savedSearches: savedSearchesList,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

export async function getSavedSearchesByUser(userId: string): Promise<SavedSearches[]> {
  return await SavedSearchesRepository.findByUserId(userId);
}

export async function deleteSavedSearchesByUser(userId: string): Promise<number> {
  return await SavedSearchesRepository.deleteByUserId(userId);
}