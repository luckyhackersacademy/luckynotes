import { TwitterApi } from "twitter-api-v2";

export function useTwitter() {
  const {
    twitterAPIKey,
    twitterAPISecret,
    twitterAccessToken,
    twitterAccessSecret,
  } = useRuntimeConfig();

  const client = new TwitterApi({
    appKey: twitterAPIKey,
    appSecret: twitterAPISecret,
    accessToken: twitterAccessToken,
    accessSecret: twitterAccessSecret,
  });

  const tweetText = async (text: string) => {
    const response = await client.v2.tweet(text);
    return response;
  };

  return { tweetText };
}
