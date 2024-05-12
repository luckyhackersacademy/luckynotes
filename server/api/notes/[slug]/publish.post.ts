import { eq } from 'drizzle-orm'

type TweetOptions = {
  title: string
  url: string
}

const tweet = ({ title, url }: TweetOptions) => `I've just published a new note: ${title}
Check it out: ${url}

#indiehacker #buildinpublic #learninpublic
`

export default eventHandler(async (event) => {
  await requireUserSession(event)

  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing slug' })
  }

  const { publishing, host } = useAppConfig()
  const { nodeEnv } = useRuntimeConfig()
  const db = useDatabase()
  if (!db) {
    throw createError({ statusCode: 500, message: 'Database not available' })
  }

  const [note] = await db
    .update(tables.notes)
    .set({
      isDraft: false,
      createdAt: new Date(),
    })
    .where(eq(tables.notes.slug, slug))
    .returning()

  const isProd = nodeEnv === 'production'
  if (publishing.twitter && isProd) {
    const { tweetText } = useTwitter()
    const url = `https://${host}/note/${slug}`
    const text = tweet({
      url,
      title: note.title,
    })

    await tweetText(text)
  }

  return { slug }
})
