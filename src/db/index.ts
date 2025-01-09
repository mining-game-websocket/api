import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

const pool = new Pool({
  connectionString: Bun.env.DATABASE_URL,
});

export const database = drizzle(pool, { schema });
