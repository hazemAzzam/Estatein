import { SavedSearches, SavedSearchesInput } from "@/schemas/saved-searches.schema";
import { Database } from "../lib/db";
import { HttpErrorLogger } from "../lib/logger";
import { HttpError } from "elysia-http-error";
import { safe } from "safe-wrapper";

export class SavedSearchesRepository {
    constructor() { }

    static async create(savedSearch: SavedSearchesInput): Promise<SavedSearches> {        
        const [error, results] = await safe(
            () => Database.sql`
                INSERT INTO saved_searches ${savedSearch}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findById(id: string): Promise<SavedSearches | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                WHERE id = ${id}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findByUserId(userId: string): Promise<SavedSearches[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                WHERE user_id = ${userId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByName(name: string): Promise<SavedSearches[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                WHERE name ILIKE ${'%' + name + '%'}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByUserIdAndName(userId: string, name: string): Promise<SavedSearches | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                WHERE user_id = ${userId} AND name = ${name}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findAll(): Promise<SavedSearches[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findPaginated(limit: number = 10, offset: number = 0): Promise<SavedSearches[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                ORDER BY created_at DESC
                LIMIT ${limit} OFFSET ${offset};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async update(id: string, savedSearch: Partial<SavedSearchesInput>): Promise<SavedSearches | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE saved_searches 
                SET ${savedSearch}
                WHERE id = ${id}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async updateName(id: string, name: string): Promise<SavedSearches | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE saved_searches 
                SET name = ${name}
                WHERE id = ${id}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async updateSearchCriteria(id: string, searchCriteria: any): Promise<SavedSearches | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE saved_searches 
                SET search_criteria = ${searchCriteria}
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
                DELETE FROM saved_searches WHERE id = ${id};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return result.rowCount > 0;
    }

    static async deleteByUserId(userId: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                DELETE FROM saved_searches WHERE user_id = ${userId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return result.rowCount;
    }

    static async countByUserId(userId: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM saved_searches 
                WHERE user_id = ${userId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async getTotalCount(): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM saved_searches;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async searchByCriteria(criteria: any): Promise<SavedSearches[]> {
        // This method searches for saved searches that contain similar criteria
        const criteriaString = JSON.stringify(criteria);
        
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                WHERE search_criteria::text ILIKE ${'%' + criteriaString + '%'}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findRecentByUserId(userId: string, limit: number = 5): Promise<SavedSearches[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM saved_searches 
                WHERE user_id = ${userId}
                ORDER BY created_at DESC
                LIMIT ${limit};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }
}
