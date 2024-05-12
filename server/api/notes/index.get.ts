import { desc, eq, sql } from 'drizzle-orm'

const LIMIT = 25

export default eventHandler(async (event) => {
  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const session = await getUserSession(event)
  const loggedIn = Boolean(session.user)

  const { page = 1 } = getQuery(event)

  const offset = (Number(page) - 1) * LIMIT
  const cursor = db.select().from(tables.notes).offset(offset).limit(LIMIT)

  if (!loggedIn) {
    cursor.where(eq(tables.notes.isDraft, loggedIn))
  }

  const [notes, queryCount] = await Promise.all([
    cursor.orderBy(desc(tables.notes.createdAt)).all(),
    db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(tables.notes)
      .get(),
  ])

  return {
    total: queryCount?.count ?? notes.length,
    results: notes,
  }
})
