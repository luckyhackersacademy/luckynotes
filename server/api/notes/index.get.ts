import { desc } from "drizzle-orm";

export default eventHandler(async () => {
  const db = useDatabase();
  if (!db) {
    throw createError({ statusCode: 500, message: "Database not available" });
  }

  const notes = await db
    .select()
    .from(tables.notes)
    .orderBy(desc(tables.notes.createdAt))
    .all();
  return notes;
});
