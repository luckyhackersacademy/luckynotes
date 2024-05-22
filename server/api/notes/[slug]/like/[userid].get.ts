import { and, eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const userId = getRouterParam(event, 'userid')
  if (!slug || !userId) {
    throw createError({ statusCode: 400, message: 'Missing slug or userid' })
  }

  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const note = await db
    .select({
      id: tables.noteLikes.id,
    })
    .from(tables.noteLikes)
    .where(and(eq(tables.noteLikes.userId, userId), eq(tables.noteLikes.noteId, slug)))
    .get()

  if (!note?.id) {
    throw createError({
      statusCode: 404,
      message: 'Like not found for userId provided',
    })
  }

  return { id: note.id }
})
