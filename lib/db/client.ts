import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { loadEnvConfig } from "@next/env";
import * as schema from "./schema";

// Load environment variables from .env.local
loadEnvConfig(process.cwd());

const databaseUrl = process.env.DATABASE_URL || "file:local.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

export const client = createClient({
  url: databaseUrl,
  authToken: authToken,
});

export const db = drizzle(client, { schema });
export type Database = typeof db;
export default db;


