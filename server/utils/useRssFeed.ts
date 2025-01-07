import { Feed, type Item } from 'feed';

import sanitize from 'sanitize-html'

export interface RSSFeedOptions {
  name: string;
  host: string;
  lang: 'en';
  description: string;
}

export const useRSSFeed = async ({
  name,
  host,
  lang,
  description,
}: RSSFeedOptions) => {
  const db = useDatabase()
  if (!db) {
    return
  }

  const feed = new Feed({
    id: host,
    title: name,
    description: description,
    language: lang,
    link: host,
    copyright: name,
  });

  const notes = await db.select().from(tables.notes).all()

  for (const note of notes) {
    const raw = sanitize(note.content!, {
      allowedTags: ['img', 'a', 'p', 'strong', 'b', 'i', 'em', 'hr'],
    });

    const item: Item = {
      title: note.title,
      id: `${host}/blog/${note.slug}`,
      link: `${host}/blog/${note.slug}`,
      description: String(raw).slice(0, 200),
      author: [
        {
          name: name,
          link: `https://${host}`,
        },
      ],
      contributor: [],
      content: note.content,
      date: note.createdAt,
    };

    feed.addItem({ ...item });
  }

  const createFeedXml = async (): Promise<string> => {
    return feed.rss2();
  };

  const createFeedAtom = async (): Promise<string> => {
    return feed.atom1();
  };

  const createFeedJson = async (): Promise<string> => {
    return feed.json1();
  };

  return {
    createFeedXml,
    createFeedJson,
    createFeedAtom,
  };
};
