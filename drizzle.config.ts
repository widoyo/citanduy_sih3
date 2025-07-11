import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    schema: './src/lib/server/db/schema.ts',
    out: './drizzle', // Directory where migrations will be stored
    driver: 'better-sqlite', // Or 'pg', 'mysql2', etc.
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;