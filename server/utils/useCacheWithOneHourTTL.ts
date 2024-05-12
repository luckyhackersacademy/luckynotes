const ONE_HOUR_TTL = 60 * 60

export function useCacheWithOneHourTTL() {
  const set = async (slug: string, note: any) => {
    await useStorage().setItem(slug, note, {
      ttl: ONE_HOUR_TTL,
    })
  }

  const get = async <T>(slug: string) => {
    const cached = await useStorage().getItem(slug)
    return cached as T
  }

  return { get, set }
}
