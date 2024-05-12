import type { NoteVirtual } from '~/entities/Note'

export function useNoteLoadMore() {
  const loading = ref<boolean>(false)
  const page = ref<number>(1)
  const results = ref<NoteVirtual[]>([])

  const loadMore = async () => {
    results.value = []

    loading.value = true

    try {
      page.value += 1
      const response = await $fetch<{ results: NoteVirtual[] }>('/api/notes', {
        method: 'GET',
        query: { page: page.value },
      })

      results.value = response.results
    } catch (e) {
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    results,
    loadMore,
  }
}
