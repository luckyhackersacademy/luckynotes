export default eventHandler(async (event) => {
  const { name, header, host } = useAppConfig()

  const { createFeedXml } = await useRSSFeed({
    name,
    description: header.descripton,
    host: `https://${host}`,
    lang: 'en',
  });

  const feed = createFeedXml();
  setResponseHeader(event, 'Content-Type', 'application/rss+xml;charset=UTF-8');
  return feed;
});
