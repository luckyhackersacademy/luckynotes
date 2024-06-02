export default defineSitemapEventHandler(async () => {
  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const notes = await db
    .select({
      slug: tables.notes.slug,
    })
    .from(tables.notes)
    .all()

  const posts = notes.map((note) => {
    return {
      loc: `/note/${note.slug}`,
      lastmod: new Date(),
    }
  })

  return posts
})
