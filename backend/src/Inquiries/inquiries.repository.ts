import { Inquiries, InquiriesInput } from "@/schemas/inquiries.schema";
import { Database } from "../lib/db";
import { HttpErrorLogger } from "../lib/logger";
import { HttpError } from "elysia-http-error";
import { safe } from "safe-wrapper";

export class InquiriesRepository {
    constructor() { }

    static async create(inquiry: InquiriesInput): Promise<Inquiries> {
        
        const [error, results] = await safe(
            () => Database.sql`
                INSERT INTO inquiries ${inquiry}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findById(id: string): Promise<Inquiries | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM inquiries 
                WHERE id = ${id}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findByPropertyId(propertyId: string): Promise<Inquiries[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM inquiries 
                WHERE property_id = ${propertyId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByFromUserId(fromUserId: string): Promise<Inquiries[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM inquiries 
                WHERE from_user_id = ${fromUserId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByToUserId(toUserId: string): Promise<Inquiries[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM inquiries 
                WHERE to_user_id = ${toUserId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByStatus(status: string): Promise<Inquiries[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM inquiries 
                WHERE status = ${status}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByInquiryType(inquiryType: string): Promise<Inquiries[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM inquiries 
                WHERE inquiry_type = ${inquiryType}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findAll(): Promise<Inquiries[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM inquiries 
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async update(id: string, inquiry: Partial<InquiriesInput>): Promise<Inquiries | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE inquiries 
                SET ${inquiry}
                WHERE id = ${id}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async updateStatus(id: string, status: string): Promise<Inquiries | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE inquiries 
                SET status = ${status}
                WHERE id = ${id}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async delete(id: string): Promise<boolean> {
        const [error, result] = await safe(
            () => Database.sql`
                DELETE FROM inquiries WHERE id = ${id};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return result.rowCount > 0;
    }

    static async countByPropertyId(propertyId: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM inquiries 
                WHERE property_id = ${propertyId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async countByStatus(status: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM inquiries 
                WHERE status = ${status};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async countByUserId(userId: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM inquiries 
                WHERE from_user_id = ${userId} OR to_user_id = ${userId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async findWithFiltersAndPagination(
        filters: any = {},
        pagination: { page: number; limit: number } = { page: 1, limit: 10 }
    ): Promise<{ inquiries: Inquiries[]; total: number }> {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;
        
        const [error, inquiriesList] = await safe(
            () => Database.sql`
                SELECT 
                    i.id,
                    i.property_id,
                    i.from_user_id,
                    i.to_user_id,
                    i.message,
                    i.inquiry_type,
                    i.status,
                    i.created_at,
                    i.updated_at,
                    p.id as property_id,
                    p.title as property_title,
                    p.address as property_address,
                    p.city as property_city,
                    p.state as property_state,
                    p.price as property_price,
                    p.rent_amount as property_rent_amount,
                    COUNT(*) OVER() as total
                FROM inquiries i
                LEFT JOIN properties p ON i.property_id = p.id
                WHERE TRUE
                ${filters.property_id ? Database.sql`AND i.property_id = ${filters.property_id}` : Database.sql``}
                ${filters.from_user_id ? Database.sql`AND i.from_user_id = ${filters.from_user_id}` : Database.sql``}
                ${filters.to_user_id ? Database.sql`AND i.to_user_id = ${filters.to_user_id}` : Database.sql``}
                ${filters.inquiry_type ? Database.sql`AND i.inquiry_type = ${filters.inquiry_type}` : Database.sql``}
                ${filters.status ? Database.sql`AND i.status = ${filters.status}` : Database.sql``}
                ORDER BY i.created_at DESC
                LIMIT ${limit} OFFSET ${offset}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        const total = inquiriesList.length > 0 ? Number(inquiriesList[0].total) : 0;
        
        return {
            inquiries: inquiriesList,
            total
        };
    }
}
