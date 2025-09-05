import { Users, UsersInput } from "@/schemas/auth.schema";
import { Database } from "../lib/db";
import { HttpErrorLogger } from "../lib/logger";
import { HttpError } from "elysia-http-error";
import { safe } from "safe-wrapper";

export class AuthRepository {
    constructor() { }

    static async create(user: UsersInput): Promise<Users> {
        const [error, results] = await safe(
            () => Database.sql`
                INSERT INTO users ${user}
                RETURNING *;
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findOneByEmail(user: {email: string}): Promise<Users | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM users 
                WHERE email = ${user.email}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }

    static async findOneByUsername(user: {username: string}): Promise<Users | null> {
        const [error, results] = await safe(
            () => Database.sql`
                SELECT * FROM users 
                WHERE username = ${user.username}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return results?.[0];
    }


    static async update(id: string, user: Partial<UsersInput>): Promise<Users | null> {
        const [error, results] = await safe(
            () => Database.sql`
                UPDATE users 
                SET ${user}
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
                DELETE FROM users WHERE id = ${id}
            `
        )();
        
        if (error) HttpErrorLogger(HttpError.Internal(error.message));
        
        return result.rowCount > 0;
    }
}