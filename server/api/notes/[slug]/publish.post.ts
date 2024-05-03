import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  await requireUserSession(event);

  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, message: "Missing slug" });
  }

  const { publishing, host } = useAppConfig();
  const { tweetText } = useTwitter();
  const db = useDatabase();
  if (!db) {
    throw createError({ statusCode: 500, message: "Database not available" });
  }

  const [note] = await db
    .update(tables.notes)
    .set({
      isDraft: false,
    })
    .where(eq(tables.notes.slug, slug))
    .returning();

  if (publishing.twitter) {
    const url = `https://${host}/note/${slug}`;
    const text = `I've just published a new note: ${note.title} \nCheck it out: ${url}`;
    console.log("tweet!", text);

    await tweetText(text);
  }

  return { slug };
});
