export default eventHandler(async (event) => {
  const { name, header, host } = useAppConfig()

  const { createFeedJson } = await useRSSFeed({
    name,
    description: header.descripton,
    host: `https://${host}`,
    lang: 'en',
  });

  const feed = createFeedJson();
  setResponseHeader(event, 'Content-Type', 'application/json;charset=UTF-8');
  return feed;
});
