import { Elysia } from 'elysia';
import { HttpError } from 'elysia-http-error';
import { HttpErrorLogger } from '../lib/logger';
import { CreatePropertyDTO, UpdatePropertyDTO, PropertyQueryDTO, PropertyParamsDTO, PropertyOwnerParamsDTO, PropertyAgentParamsDTO } from './properties.dtos';
import {
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getProperties,
  getPropertiesByOwner,
  getPropertiesByAgent
} from './properties.service';

const properties = new Elysia({ prefix: '/properties' })
  .get('/', async ({ query }) => getProperties(query, { page: Number(query.page) || 1, limit: Number(query.limit) || 10 }), {
    query: PropertyQueryDTO,
    detail: {
      description: "Get all properties with optional filters and pagination",
      tags: ["Properties"],
    }
  })
  .get('/:id', async ({ params }) => getPropertyById(params.id), {
    params: PropertyParamsDTO,
    detail: {
      description: "Get a specific property by ID",
      tags: ["Properties"],
    }
  })
  .post('/', async ({ body }) => createProperty(body), {
    body: CreatePropertyDTO,
    detail: {
      description: "Create a new property",
      tags: ["Properties"],
    }
  })
  .put('/:id', async ({ params, body }) => updateProperty(params.id, body), {
    params: PropertyParamsDTO,
    body: UpdatePropertyDTO,
    detail: {
      description: "Update a property by ID",
      tags: ["Properties"],
    }
  })
  .delete('/:id', async ({ params }) => deleteProperty(params.id), {
    params: PropertyParamsDTO,
    detail: {
      description: "Delete a property by ID",
      tags: ["Properties"],
    }
  })
  .get('/owner/:ownerId', async ({ params }) => getPropertiesByOwner(params.ownerId), {
    params: PropertyOwnerParamsDTO,
    detail: {
      description: "Get properties by owner ID",
      tags: ["Properties"],
    }
  })
  .get('/agent/:agentId', async ({ params }) => getPropertiesByAgent(params.agentId), {
    params: PropertyAgentParamsDTO,
    detail: {
      description: "Get properties by agent ID",
      tags: ["Properties"],
    }
  });

export default properties;