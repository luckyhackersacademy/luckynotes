import { eq } from 'drizzle-orm'
import { NoteVirtual } from '~/entities/Note'

export default eventHandler(async (event) => {
  await requireUserSession(event)

  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const { get, set } = useCacheWithOneWeekTTL()
  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const payload = await readBody<NoteVirtual>(event)

  await db
    .update(tables.notes)
    .set({
      title: payload.title,
      content: payload.content,
      isDraft: payload.isDraft,
    })
    .where(eq(tables.notes.slug, slug))
    .get()

  const cachedNote = await get<NoteVirtual>(slug)
  cachedNote.title = payload.title
  cachedNote.content = payload.content
  cachedNote.isDraft = payload.isDraft

  await set(slug, { ...cachedNote })

  return { slug }
})
