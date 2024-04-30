import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { join } from "path";

export default defineNitroPlugin(async () => {
  if (process.dev) {
    const { dbDir } = useRuntimeConfig();
    migrate(useDatabase(), { migrationsFolder: join(dbDir, "./migrations") });
  }
});
