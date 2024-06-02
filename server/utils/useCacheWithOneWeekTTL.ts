const ONE_WEEK_TTL = 60 * 60 * 24 * 7

export function useCacheWithOneWeekTTL() {
  const set = async (slug: string, note: any) => {
    await useStorage().setItem(slug, note, {
      ttl: ONE_WEEK_TTL,
    })
  }

  const get = async <T>(slug: string) => {
    const cached = await useStorage().getItem(slug)
    return cached as T
  }

  return { get, set }
}
