import { Favorites, FavoritesInput } from '../schemas/favorites.schema';
import { FavoritesRepository } from './favorites.repository';

export interface FavoriteFilters {
  user_id?: string;
  property_id?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface FavoriteListResult {
  favorites: (Favorites & { property?: any })[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createFavorite(favoriteData: FavoritesInput): Promise<Favorites> {
  return await FavoritesRepository.create(favoriteData);
}

export async function getFavoriteById(id: string): Promise<Favorites | null> {
  return await FavoritesRepository.findById(id);
}

export async function deleteFavorite(id: string): Promise<boolean> {
  return await FavoritesRepository.delete(id);
}

export async function deleteFavoriteByUserAndProperty(userId: string, propertyId: string): Promise<boolean> {
  return await FavoritesRepository.deleteByUserAndProperty(userId, propertyId);
}

export async function getFavorites(
  filters: FavoriteFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
): Promise<FavoriteListResult> {
  let favorites: Favorites[] = [];
  
  if (filters.user_id) {
    favorites = await FavoritesRepository.findByUserId(filters.user_id);
  } else if (filters.property_id) {
    favorites = await FavoritesRepository.findByPropertyId(filters.property_id);
  } else {
    favorites = await FavoritesRepository.findAll();
  }
  
  const total = favorites.length;
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;
  
  // Apply pagination
  const paginatedFavorites = favorites.slice(offset, offset + limit);
  
  return {
    favorites: paginatedFavorites as (Favorites & { property?: any })[],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

export async function getFavoritesByUser(userId: string): Promise<(Favorites & { property?: any })[]> {
  // For now, we'll use the repository method and add property details in a future enhancement
  // This maintains the current interface while using the repository pattern
  const favorites = await FavoritesRepository.findByUserId(userId);
  
  // TODO: Add property details join in repository or create a separate method
  return favorites as (Favorites & { property?: any })[];
}

export async function isPropertyFavorited(userId: string, propertyId: string): Promise<boolean> {
  const favorite = await FavoritesRepository.findByUserAndProperty(userId, propertyId);
  return !!favorite;
}