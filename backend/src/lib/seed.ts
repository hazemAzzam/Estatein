import { Database } from './db';
import { readFileSync } from 'fs';
import { join } from 'path';

async function runSeed() {
    try {
        console.log('🌱 Starting database seeding...');
        
        // Initialize database connection
        const db = new Database();
        
        // Read the seed file
        const seedPath = join(__dirname, 'migrations', '002_seed_data.sql');
        const seedSQL = readFileSync(seedPath, 'utf-8');
        
        console.log('📖 Reading seed file...');
        
        // Execute the seed data
        console.log('⏳ Executing seed data...');
        try {
            await Database.sql.unsafe(seedSQL);
            console.log('✅ Seed data executed successfully');
        } catch (error) {
            console.error('❌ Error executing seed data:', error);
            throw error;
        }
        
        console.log('🎉 Database seeding completed successfully!');
        
        // Close database connection
        await Database.sql.close();
        
    } catch (error) {
        console.error('💥 Seeding failed:', error);
        process.exit(1);
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    runSeed();
}

export { runSeed };
