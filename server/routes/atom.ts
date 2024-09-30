export default eventHandler(async (event) => {
  const { name, header, host } = useAppConfig()

  const { createFeedAtom } = await useRSSFeed({
    name,
    description: header.descripton,
    host: `https://${host}`,
    lang: 'en',
  });

  const feed = createFeedAtom();
  setResponseHeader(
    event,
    'Content-Type',
    'application/atom+xml;charset=UTF-8',
  );
  return feed;
});
