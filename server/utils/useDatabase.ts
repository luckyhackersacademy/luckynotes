import { createClient as createLibSQLClient } from "@libsql/client/http";
import { drizzle as drizzleLibSQL, LibSQLDatabase } from "drizzle-orm/libsql";
import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
// @ts-ignore
import Database from "better-sqlite3";
import { join } from "pathe";

export * as tables from "~/server/database/schema";

let database: BetterSQLite3Database | LibSQLDatabase | null = null;

export const useDatabase = () => {
  const { tursoDBURL, tursoDBToken, databaseDir } = useRuntimeConfig();

  /*
  if (process.dev) {
    // local sqlite in development
    const sqlite = new Database(join(databaseDir, "./db.sqlite"));
    database = drizzle(sqlite);
  }
  */

  if (tursoDBURL && tursoDBToken) {
    database = drizzleLibSQL(
      createLibSQLClient({
        url: process.env.TURSO_DB_URL!,
        authToken: process.env.TURSO_DB_TOKEN!,
      }),
    );
  }

  return database;
};
