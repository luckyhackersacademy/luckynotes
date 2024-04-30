import type { Config } from "drizzle-kit";

export default {
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_TOKEN!,
  },
} satisfies Config;
