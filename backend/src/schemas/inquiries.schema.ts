/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 * Inquiries Schema - Inquiry-related types and interfaces
 */

export type inquiry_type_enum = 'general' | 'offer' | 'question' | 'viewing_request';
export type inquiry_status_enum = 'closed' | 'pending' | 'responded';

// Table inquiries
export interface Inquiries {
  id: string;
  property_id: string | null;
  from_user_id: string | null;
  to_user_id: string | null;
  message: string;
  inquiry_type: inquiry_type_enum | null;
  status: inquiry_status_enum | null;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface InquiriesInput {
  id?: string;
  property_id?: string | null;
  from_user_id?: string | null;
  to_user_id?: string | null;
  message: string;
  inquiry_type?: inquiry_type_enum | null;
  status?: inquiry_status_enum | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

const inquiries = {
  tableName: 'inquiries',
  columns: ['id', 'property_id', 'from_user_id', 'to_user_id', 'message', 'inquiry_type', 'status', 'created_at', 'updated_at'],
  requiredForInsert: ['message'],
  primaryKey: 'id',
  foreignKeys: {
    property_id: { table: 'properties', column: 'id', $type: null as unknown as any },
    from_user_id: { table: 'users', column: 'id', $type: null as unknown as any },
    to_user_id: { table: 'users', column: 'id', $type: null as unknown as any },
  },
  $type: null as unknown as Inquiries,
  $input: null as unknown as InquiriesInput
} as const;

export { inquiries };
