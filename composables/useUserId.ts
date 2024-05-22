import FingerprintJS from '@fingerprintjs/fingerprintjs'

export function useUserId() {
  const userId = ref<string>()

  const fetchUserId = async () => {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      userId.value = result.visitorId
    } catch (_) {}
  }

  onMounted(() => {
    fetchUserId()
  })

  return {
    userId,
  }
}
