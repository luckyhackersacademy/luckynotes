export interface DeleteOptions {
  slug: string
}

export function useNoteDelete({ slug }: DeleteOptions) {
  const toast = useToast()
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  const remove = async () => {
    if (!slug) {
      return
    }

    start()

    try {
      await $fetch(`/api/notes/${slug}`, {
        method: 'DELETE',
      })

      toast.add({
        title: 'Note deleted!',
        color: 'green',
      })
    } catch (error) {
      toast.add({
        title: 'Note delete error',
        description: error.data?.message,
        color: 'red',
      })
    } finally {
      finish()
    }
  }

  return { loading, remove }
}
