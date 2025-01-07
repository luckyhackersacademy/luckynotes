export default eventHandler(async (event) => {
  const { name, header, host } = useAppConfig()

  const fns = await useRSSFeed({
    name,
    description: header.descripton,
    host: `https://${host}`,
    lang: 'en',
  });

  if (!fns) {
    return
  }

  const feed = fns.createFeedXml();
  setResponseHeader(event, 'Content-Type', 'application/rss+xml;charset=UTF-8');
  return feed;
});
