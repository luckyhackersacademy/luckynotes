import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const notes = sqliteTable('notes', {
  slug: text('slug').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  viewCount: integer('view_count').default(0),
  likeCount: integer('like_count').default(0),
  isDraft: integer('is_draft', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_DATE)`),
})

export const noteLikes = sqliteTable('note_likes', {
  id: text('id').primaryKey(),
  noteId: text('slug').references(() => notes.slug),
  userId: text('userId'),
})

export const noteViews = sqliteTable('note_views', {
  id: text('id').primaryKey(),
  noteId: text('slug').references(() => notes.slug),
  userId: text('userId'),
})
