import { Elysia } from 'elysia';
import { HttpError } from 'elysia-http-error';
import { HttpErrorLogger } from '../lib/logger';
import { CreateSavedSearchDTO, UpdateSavedSearchDTO, SavedSearchQueryDTO, SavedSearchParamsDTO, SavedSearchUserParamsDTO } from './saved-searches.dtos';
import {
  createSavedSearch,
  getSavedSearchById,
  updateSavedSearch,
  deleteSavedSearch,
  getSavedSearches,
  getSavedSearchesByUser,
  deleteSavedSearchesByUser
} from './saved-searches.service';

const savedSearches = new Elysia({ prefix: '/saved-searches' })
  .get('/', async ({ query }) => getSavedSearches(query, { page: Number(query.page) || 1, limit: Number(query.limit) || 10 }), {
    query: SavedSearchQueryDTO,
    detail: {
      description: "Get all saved searches with optional filters and pagination",
      tags: ["SavedSearches"],
    }
  })
  .get('/:id', async ({ params }) => getSavedSearchById(params.id), {
    params: SavedSearchParamsDTO,
    detail: {
      description: "Get a specific saved search by ID",
      tags: ["SavedSearches"],
    }
  })
  .post('/', async ({ body }) => createSavedSearch(body), {
    body: CreateSavedSearchDTO,
    detail: {
      description: "Create a new saved search",
      tags: ["SavedSearches"],
    }
  })
  .put('/:id', async ({ params, body }) => updateSavedSearch(params.id, body), {
    params: SavedSearchParamsDTO,
    body: UpdateSavedSearchDTO,
    detail: {
      description: "Update a saved search by ID",
      tags: ["SavedSearches"],
    }
  })
  .delete('/:id', async ({ params }) => deleteSavedSearch(params.id), {
    params: SavedSearchParamsDTO,
    detail: {
      description: "Delete a saved search by ID",
      tags: ["SavedSearches"],
    }
  })
  .get('/user/:userId', async ({ params }) => getSavedSearchesByUser(params.userId), {
    params: SavedSearchUserParamsDTO,
    detail: {
      description: "Get all saved searches for a specific user",
      tags: ["SavedSearches"],
    }
  })
  .delete('/user/:userId', async ({ params }) => deleteSavedSearchesByUser(params.userId), {
    params: SavedSearchUserParamsDTO,
    detail: {
      description: "Delete all saved searches for a specific user",
      tags: ["SavedSearches"],
    }
  });

export default savedSearches;