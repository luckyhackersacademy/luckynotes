import type { NitroCtx, Feed } from 'nuxt-module-feed'
import sanitizeHtml from 'sanitize-html'

export default defineNitroPlugin(async (nitroApp) => {
  const db = useDatabase()
  if (!db) {
    return
  }

  const { name, host, author } = useAppConfig()

  const notes = await db.select().from(tables.notes).all()

  async function createFeedXml(feed: Feed) {
    feed.options = {
      id: host,
      title: name,
      link: `https://${host}`,
      copyright: author.twitter,
    }

    for (const note of notes) {
      const content = await parseMarkdown(note.content)
      const raw = sanitizeHtml(content, { allowedTags: ['img', 'a', 'p', 'strong', 'b', 'i', 'em', 'hr'] })

      feed.addItem({
        title: note.title,
        id: `https://${host}/note/${note.slug}`,
        link: `https://${host}/note/${note.slug}`,
        description: raw.slice(0, 200),
        content: raw,
        date: note.createdAt,
      })
    }

    feed.addContributor({
      name: author.name,
      email: author.email,
      link: `https://${host}`,
    })
  }

  nitroApp.hooks.hook('feed:generate', async ({ feed, options }: NitroCtx) => {
    switch (options.path) {
      case '/feed.xml': {
        await createFeedXml(feed)
        break
      }
    }
  })
})
