export default eventHandler(async (event) => {
  const db = useDatabase();
  if (!db) {
    throw createError({ statusCode: 500, message: "Database not available" });
  }

  const notes = await db.select().from(tables.notes).all();
  return notes;
});
