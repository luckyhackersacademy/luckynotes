import type { NitroCtx, Feed } from 'nuxt-module-feed'
import sanitizeHtml from 'sanitize-html'
import markdownit from 'markdown-it'

const md = markdownit()

export default defineNitroPlugin(async (nitroApp) => {
  const db = useDatabase()
  if (!db) {
    return
  }

  const { name, header, host, author } = useAppConfig()

  const notes = await db.select().from(tables.notes).all()

  // any cuz it's only a dto
  const items: any[] = []

  for (const note of notes) {
    const content = md.render(note.content)
    const raw = sanitizeHtml(content, { allowedTags: ['img', 'a', 'p', 'strong', 'b', 'i', 'em', 'hr'] })

    items.push({
      title: note.title,
      id: `https://${host}/note/${note.slug}`,
      link: `https://${host}/note/${note.slug}`,
      description: raw.slice(0, 200),
      content: raw,
      date: note.createdAt,
    })
  }

  function createFeedXml(feed: Feed) {
    feed.options = {
      id: host,
      title: name,
      description: header.description,
      link: `https://${host}`,
      copyright: author.twitter,
    }

    for (const item of items) {
      feed.addItem({
        title: item.title,
        id: item.id,
        link: item.link,
        description: item.description,
        content: item.content,
        date: item.date,
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
        createFeedXml(feed)
        break
      }
      case '/rss.xml': {
        createFeedXml(feed)
        break
      }
    }
  })
})
