import { createClient as createLibSQLClient } from "@libsql/client/http";
import { drizzle as drizzleLibSQL, LibSQLDatabase } from "drizzle-orm/libsql";

export * as tables from "~/server/database/schema";

let database: LibSQLDatabase | null = null;

export const useDatabase = () => {
  const { tursoDBURL, tursoDBToken } = useRuntimeConfig();

  if (tursoDBURL && tursoDBToken) {
    database = drizzleLibSQL(
      createLibSQLClient({
        url: tursoDBURL,
        authToken: tursoDBToken,
      }),
    );
  }

  return database;
};
