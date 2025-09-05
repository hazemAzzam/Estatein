import { Favorites, FavoritesInput } from "@/schemas/favorites.schema";
import { Database } from "../lib/db";
import { HttpErrorLogger } from "../lib/logger";
import { HttpError } from "elysia-http-error";
import { safe } from "safe-wrapper";

export class FavoritesRepository {
    constructor() { }

    static async create(favorite: FavoritesInput): Promise<Favorites> {
        const id = crypto.randomUUID();
        
        const [error, results] = await safe(
            () => Database.sql`
                INSERT INTO favorites ${favorite}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findById(id: string): Promise<Favorites | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM favorites 
                WHERE id = ${id}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findByUserId(userId: string): Promise<Favorites[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM favorites 
                WHERE user_id = ${userId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByPropertyId(propertyId: string): Promise<Favorites[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM favorites 
                WHERE property_id = ${propertyId}
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async findByUserAndProperty(userId: string, propertyId: string): Promise<Favorites | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM favorites 
                WHERE user_id = ${userId} AND property_id = ${propertyId}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findAll(): Promise<Favorites[]> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM favorites 
                ORDER BY created_at DESC;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results;
    }

    static async update(id: string, favorite: Partial<FavoritesInput>): Promise<Favorites | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE favorites 
                SET ${favorite}
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
                DELETE FROM favorites WHERE id = ${id};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return result.rowCount > 0;
    }

    static async deleteByUserAndProperty(userId: string, propertyId: string): Promise<boolean> {
        const [error, result] = await safe(
            () => Database.sql`
                DELETE FROM favorites 
                WHERE user_id = ${userId} AND property_id = ${propertyId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return result.rowCount > 0;
    }

    static async countByUserId(userId: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM favorites 
                WHERE user_id = ${userId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }

    static async countByPropertyId(propertyId: string): Promise<number> {
        const [error, result] = await safe(
            () => Database.sql`
                SELECT COUNT(*) as count FROM favorites 
                WHERE property_id = ${propertyId};
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return parseInt(result[0]?.count || '0');
    }
}
