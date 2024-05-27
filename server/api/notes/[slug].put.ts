import { eq } from 'drizzle-orm'
import { NoteVirtual } from '~/entities/Note'

export default eventHandler(async (event) => {
  await requireUserSession(event)

  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const { set } = useCacheWithOneWeekTTL()
  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const payload = await readBody<NoteVirtual>(event)

  const { likeCount, viewCount, createdAt } = await db
    .update(tables.notes)
    .set({
      title: payload.title,
      content: payload.content,
      isDraft: payload.isDraft,
    })
    .where(eq(tables.notes.slug, slug))
    .returning({
      likeCount: tables.notes.likeCount,
      viewCount: tables.notes.viewCount,
      createdAt: tables.notes.createdAt,
    })
    .get()

  await set(slug, {
    slug,
    likeCount,
    viewCount,
    title: payload.title,
    content: payload.content,
    isDraft: payload.isDraft ?? false,
    createdAt: createdAt.toISOString(),
    parsed: await parseMarkdown(payload.content),
  })

  return { slug }
})
