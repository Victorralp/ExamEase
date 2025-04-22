import type { Config } from "drizzle-kit";

export default {
  schema: "./shared/schema_mysql.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.MYSQL_DATABASE_URL || '',
  },
} satisfies Config;