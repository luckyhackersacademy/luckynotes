import { desc, eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const db = useDatabase();
  if (!db) {
    throw createError({ statusCode: 500, message: "Database not available" });
  }

  const session = await getUserSession(event);
  const loggedIn = Boolean(session.user)

  const cursor = db
    .select()
    .from(tables.notes)

  if (!loggedIn) {
    cursor.where(eq(tables.notes.isDraft, loggedIn))
  }
    
  const notes = await cursor
    .orderBy(desc(tables.notes.createdAt))
    .all();

  return notes;
});
