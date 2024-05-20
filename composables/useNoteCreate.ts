import type { NoteVirtual } from '~/entities/Note'

export function useNoteCreate() {
  const toast = useToast()
  const title = ref<string>()
  const slug = ref<string>()
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  const create = async () => {
    start()

    try {
      const response = await $fetch<NoteVirtual>('/api/notes', {
        method: 'POST',
        body: {
          title: title.value,
          content: '# Hello world!',
        },
      })

      slug.value = response.slug
    } catch (error) {
      toast.add({
        title: 'Note create error',
        description: error.data?.message,
        color: 'red',
      })
    } finally {
      finish()
    }
  }

  return {
    loading,
    title,
    slug,
    create,
  }
}
