import pg from "pg";
import { env } from "../config.js";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema });
