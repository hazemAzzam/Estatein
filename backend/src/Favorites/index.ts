import { Elysia } from 'elysia';
import { HttpError } from 'elysia-http-error';
import { HttpErrorLogger } from '../lib/logger';
import { CreateFavoriteDTO, FavoriteQueryDTO, FavoriteParamsDTO, FavoriteUserParamsDTO, FavoriteCheckParamsDTO } from './favorites.dtos';
import {
  createFavorite,
  getFavoriteById,
  deleteFavorite,
  getFavorites,
  getFavoritesByUser,
  isPropertyFavorited
} from './favorites.service';

const favorites = new Elysia({ prefix: '/favorites' })
  .get('/', async ({ query }) => getFavorites(query, { page: Number(query.page) || 1, limit: Number(query.limit) || 10 }),
   {query: FavoriteQueryDTO ,
    detail: {
       description:"get all favorites with optional filters and pagination",
       params: FavoriteParamsDTO,
       tags: ["Favorites"],
    }
   })
  .get('/:id', async ({ params }) => getFavoriteById(params.id), {
    params: FavoriteParamsDTO,
    detail: {
      description: "Get a specific favorite by ID",
      tags: ["Favorites"],
    }
  })
  .post('/', async ({ body }) => createFavorite(body), {
    body: CreateFavoriteDTO,
    detail: {
      description: "Create a new favorite",
      tags: ["Favorites"],
    }
  })
  .delete('/:id', async ({ params }) => deleteFavorite(params.id), {
    params: FavoriteParamsDTO,
    detail: {
      description: "Delete a favorite by ID",
      tags: ["Favorites"],
    }
  })
  .get('/user/:userId', async ({ params }) => getFavoritesByUser(params.userId), {
    params: FavoriteUserParamsDTO,
    detail: {
      description: "Get all favorites for a specific user",
      tags: ["Favorites"],
    }
  })
  .get('/check/:userId/:propertyId', async ({ params }) => isPropertyFavorited(params.userId, params.propertyId), {
    params: FavoriteCheckParamsDTO,
    detail: {
      description: "Check if a property is favorited by a user",
      tags: ["Favorites"],
    }
  });

export default favorites;