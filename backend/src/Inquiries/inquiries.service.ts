import { Inquiries, InquiriesInput } from '../schemas/inquiries.schema';
import { InquiriesRepository } from './inquiries.repository';

export interface InquiryFilters {
  property_id?: string;
  from_user_id?: string;
  to_user_id?: string;
  inquiry_type?: string;
  status?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface InquiryListResult {
  inquiries: (Inquiries & { property?: any })[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createInquiry(inquiryData: InquiriesInput): Promise<Inquiries> {
  return await InquiriesRepository.create(inquiryData);
}

export async function getInquiryById(id: string): Promise<Inquiries | null> {
  return await InquiriesRepository.findById(id);
}

export async function updateInquiry(id: string, inquiryData: Partial<InquiriesInput>): Promise<Inquiries | null> {
  return await InquiriesRepository.update(id, inquiryData);
}

export async function deleteInquiry(id: string): Promise<boolean> {
  return await InquiriesRepository.delete(id);
}

export async function getInquiries(
  filters: InquiryFilters = {},
  pagination: PaginationOptions = { page: 1, limit: 10 }
): Promise<InquiryListResult> {
  const { page, limit } = pagination;
  const result = await InquiriesRepository.findWithFiltersAndPagination(filters, pagination);
  
  return {
    inquiries: result.inquiries,
    total: result.total,
    page,
    limit,
    totalPages: Math.ceil(result.total / limit)
  };
}

export async function getInquiriesByProperty(propertyId: string): Promise<Inquiries[]> {
  return await InquiriesRepository.findByPropertyId(propertyId);
}

export async function getInquiriesByUser(userId: string, type: 'sent' | 'received' = 'sent'): Promise<Inquiries[]> {
  if (type === 'sent') {
    return await InquiriesRepository.findByFromUserId(userId);
  } else {
    return await InquiriesRepository.findByToUserId(userId);
  }
}

export async function updateInquiryStatus(id: string, status: 'pending' | 'responded' | 'closed'): Promise<Inquiries | null> {
  return await InquiriesRepository.updateStatus(id, status);
}