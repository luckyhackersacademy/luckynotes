import { eq } from "drizzle-orm";
import { NoteVirtual } from "~/entities/Note";

export default eventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const db = useDatabase();
  if (!db) {
    throw createError({ statusCode: 500, message: "Database not available" });
  }

  const note = await db
    .select()
    .from(tables.notes)
    .where(eq(tables.notes.slug, slug))
    .get();

  if (!note) {
    throw createError({
      statusCode: 404,
      message: "Note not found",
    });
  }

  const noteParsed: NoteVirtual = {
    slug,
    title: note.title,
    content: note.content,
    isDraft: note.isDraft ?? false,
    createdAt: note.createdAt.toISOString(),
    parsed: await parseMarkdown(note.content),
  };

  return noteParsed;
});
