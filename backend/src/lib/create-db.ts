import { SQL } from 'bun';

async function createDatabase() {
    try {
        console.log('🚀 Creating database...');
        
        // Connect to default postgres database to create our database
        const sql = new SQL({
            url: 'postgres://postgres:postgres@localhost:5432/postgres',
            port: 5432,
            max: 1,
            idleTimeout: 0,
            maxLifetime: 0,
            connectionTimeout: 30,
            tls: false,
            adapter: 'postgres',
            bigint: false,
        });
        
        console.log('⏳ Connected to postgres database');
        
        // Create the realestate database
        await sql`CREATE DATABASE realestate`;
        console.log('✅ Database "realestate" created successfully');
        
        // Close connection
        await sql.close();
        
    } catch (error:any) {
        if (error.message.includes('already exists')) {
            console.log('ℹ️ Database "realestate" already exists');
        } else {
            console.error('💥 Error creating database:', error);
            throw error;
        }
    }
}

// Run if this file is executed directly
if (require.main === module) {
    createDatabase();
}

export { createDatabase };
