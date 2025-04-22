import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema_mysql.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3308,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "$Christopher2024",
    database: process.env.DB_NAME || "examease",
  },
} satisfies Config;
