import { Properties, PropertiesInput } from "@/schemas/properties.schema";
import { Database } from "../lib/db";
import { HttpErrorLogger } from "../lib/logger";
import { HttpError } from "elysia-http-error";
import { safe } from "safe-wrapper";

export class PropertiesRepository {
    constructor() { }

    static async create(property: PropertiesInput): Promise<Properties> {
        const id = crypto.randomUUID();
        
        const [error, results] = await safe(
            () => Database.sql`
                INSERT INTO properties ${property}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findById(id: string): Promise<Properties | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE id = ${id}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findByOwnerId(ownerId: string): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE owner_id = ${ownerId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByAgentId(agentId: string): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE agent_id = ${agentId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByStatus(status: string): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE status = ${status}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByPropertyType(propertyType: string): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE property_type = ${propertyType}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByCity(city: string): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE city = ${city}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByState(state: string): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE state = ${state}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByPriceRange(minPrice: number, maxPrice: number): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE price BETWEEN ${minPrice} AND ${maxPrice}
                ORDER BY price ASC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByBedrooms(bedrooms: number): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE bedrooms >= ${bedrooms}
                ORDER BY bedrooms ASC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByBathrooms(bathrooms: number): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                WHERE bathrooms >= ${bathrooms}
                ORDER BY bathrooms ASC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async searchByLocation(latitude: number, longitude: number, radiusKm: number = 10): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT *, 
                    (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * 
                    cos(radians(longitude) - radians(${longitude})) + 
                    sin(radians(${latitude})) * sin(radians(latitude)))) AS distance
                FROM properties 
                WHERE latitude IS NOT NULL AND longitude IS NOT NULL
                HAVING distance <= ${radiusKm}
                ORDER BY distance ASC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findAll(): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findPaginated(limit: number = 10, offset: number = 0): Promise<Properties[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM properties 
                ORDER BY created_at DESC
                LIMIT ${limit} OFFSET ${offset};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async update(id: string, property: Partial<PropertiesInput>): Promise<Properties | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE properties 
                SET ${property}
                WHERE id = ${id}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async updateStatus(id: string, status: string): Promise<Properties | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE properties 
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
                DELETE FROM properties WHERE id = ${id};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return result.rowCount > 0;
    }

    static async countByStatus(status: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM properties 
                WHERE status = ${status};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async countByPropertyType(propertyType: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM properties 
                WHERE property_type = ${propertyType};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async countByOwnerId(ownerId: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM properties 
                WHERE owner_id = ${ownerId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async getTotalCount(): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM properties;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async findWithFiltersAndPagination(
        filters: any = {},
        pagination: { page: number; limit: number } = { page: 1, limit: 10 }
    ): Promise<{ properties: Properties[]; total: number }> {
        const { page, limit } = pagination;
        const offset = (page - 1) * limit;
        
        const [error, propertiesList] = await safe(
            () => Database.sql`
                SELECT 
                    p.*,
                    COUNT(*) OVER() AS total
                FROM properties p
                WHERE TRUE
                ${filters.property_type ? Database.sql`AND property_type = ${filters.property_type}` : Database.sql``}
                ${filters.status ? Database.sql`AND status = ${filters.status}` : Database.sql``}
                ${filters.city ? Database.sql`AND city ILIKE ${'%' + filters.city + '%'}` : Database.sql``}
                ${filters.state ? Database.sql`AND state ILIKE ${'%' + filters.state + '%'}` : Database.sql``}
                ${filters.min_price ? Database.sql`AND price > ${filters.min_price}` : Database.sql``}
                ${filters.max_price ? Database.sql`AND price <= ${filters.max_price}` : Database.sql``}
                ${filters.min_rent ? Database.sql`AND rent_amount >= ${filters.min_rent}` : Database.sql``}
                ${filters.max_rent ? Database.sql`AND rent_amount <= ${filters.max_rent}` : Database.sql``}
                ${filters.bedrooms ? Database.sql`AND bedrooms = ${filters.bedrooms}` : Database.sql``}
                ${filters.bathrooms ? Database.sql`AND bathrooms = ${filters.bathrooms}` : Database.sql``}
                ${filters.min_sqft ? Database.sql`AND square_feet >= ${filters.min_sqft}` : Database.sql``}
                ${filters.max_sqft ? Database.sql`AND square_feet <= ${filters.max_sqft}` : Database.sql``}
                ${filters.search 
                    ? Database.sql`AND (title ILIKE ${'%' + filters.search + '%'} 
                            OR description ILIKE ${'%' + filters.search + '%'} 
                            OR address ILIKE ${'%' + filters.search + '%'})`
                    : Database.sql``}
                ORDER BY created_at DESC
                LIMIT ${limit} OFFSET ${offset};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        const total = propertiesList.length > 0 ? +propertiesList[0].total : 0;
        
        return {
            properties: propertiesList,
            total
        };
    }
}
