import { Elysia } from 'elysia';
import { HttpError } from 'elysia-http-error';
import { HttpErrorLogger } from '../lib/logger';
import { CreateInquiryDTO, UpdateInquiryDTO, InquiryQueryDTO, InquiryParamsDTO, InquiryPropertyParamsDTO, InquiryUserParamsDTO, InquiryStatusUpdateDTO } from './inquiries.dtos';
import {
  createInquiry,
  getInquiryById,
  updateInquiry,
  deleteInquiry,
  getInquiries,
  getInquiriesByProperty,
  getInquiriesByUser,
  updateInquiryStatus
} from './inquiries.service';

const inquiries = new Elysia({ prefix: '/inquiries' })
  .get('/', async ({ query }) => getInquiries(query, { page: Number(query.page) || 1, limit: Number(query.limit) || 10 }), {
    query: InquiryQueryDTO,
    detail: {
      description: "Get all inquiries with optional filters and pagination",
      tags: ["Inquiries"],
    }
  })
  .get('/:id', async ({ params }) => getInquiryById(params.id), {
    params: InquiryParamsDTO,
    detail: {
      description: "Get a specific inquiry by ID",
      tags: ["Inquiries"],
    }
  })
  .post('/', async ({ body }) => createInquiry(body), {
    body: CreateInquiryDTO,
    detail: {
      description: "Create a new inquiry",
      tags: ["Inquiries"],
    }
  })
  .put('/:id', async ({ params, body }) => updateInquiry(params.id, body), {
    params: InquiryParamsDTO,
    body: UpdateInquiryDTO,
    detail: {
      description: "Update an inquiry by ID",
      tags: ["Inquiries"],
    }
  })
  .delete('/:id', async ({ params }) => deleteInquiry(params.id), {
    params: InquiryParamsDTO,
    detail: {
      description: "Delete an inquiry by ID",
      tags: ["Inquiries"],
    }
  })
  .get('/property/:propertyId', async ({ params }) => getInquiriesByProperty(params.propertyId), {
    params: InquiryPropertyParamsDTO,
    detail: {
      description: "Get inquiries by property ID",
      tags: ["Inquiries"],
    }
  })
  .get('/user/:userId', async ({ params }) => getInquiriesByUser(params.userId), {
    params: InquiryUserParamsDTO,
    detail: {
      description: "Get inquiries by user ID",
      tags: ["Inquiries"],
    }
  })
  .patch('/:id/status', async ({ params, body }) => updateInquiryStatus(params.id, body.status), {
    params: InquiryParamsDTO,
    body: InquiryStatusUpdateDTO,
    detail: {
      description: "Update inquiry status by ID",
      tags: ["Inquiries"],
    }
  });

export default inquiries;