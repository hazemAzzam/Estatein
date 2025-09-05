import { Database } from './db';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

async function runMigrations() {
    try {
        console.log('🚀 Starting database migration...');
        
        // Initialize database connection
        const db = new Database();
        
        // Get migrations directory path
        const migrationsDir = join(__dirname, 'migrations');
        
        // Read all migration files and sort them by numeric prefix
        const migrationFiles = readdirSync(migrationsDir)
            .filter(file => file.endsWith('_initial_schema.sql'))
            .sort((a, b) => {
                // Extract numeric prefix from filename (e.g., "001" from "001_initial_schema.sql")
                const prefixA = parseInt(a.split('_')[0]);
                const prefixB = parseInt(b.split('_')[0]);
                return prefixA - prefixB;
            });
        
        console.log(`📁 Found ${migrationFiles.length} migration files: ${migrationFiles.join(', ')}`);
        
        // Execute each migration file in sequence
        for (let i = 0; i < migrationFiles.length; i++) {
            const migrationFile = migrationFiles[i];
            console.log(`\n📖 Processing migration ${i + 1}/${migrationFiles.length}: ${migrationFile}`);
            
            try {
                // Read the migration file
                const migrationPath = join(migrationsDir, migrationFile);
                const migrationSQL = readFileSync(migrationPath, 'utf-8');
                
                console.log(`⏳ Executing ${migrationFile}...`);
                
                // Execute the migration
                await Database.sql.unsafe(migrationSQL);
                console.log(`✅ ${migrationFile} executed successfully`);
                
            } catch (error) {
                console.error(`❌ Error executing ${migrationFile}:`, error);
                throw error;
            }
        }
        
        console.log('\n🎉 All migrations completed successfully!');
        
        // Close database connection
        await Database.sql.close();
        
    } catch (error) {
        console.error('💥 Migration failed:', error);
        process.exit(1);
    }
}

// Run migrations if this file is executed directly
if (require.main === module) {
    runMigrations();
}

export { runMigrations };
