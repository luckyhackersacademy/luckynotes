export interface PublishOptions {
  slug: string
}

export function useNotePublish({ slug }: PublishOptions) {
  const toast = useToast()
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  const publish = async () => {
    if (!slug) {
      return
    }

    start()

    try {
      await $fetch(`/api/notes/${slug}/publish`, {
        method: 'POST',
      })

      toast.add({
        title: 'Note publish!',
        color: 'green',
      })
    } catch (error) {
      toast.add({
        title: 'Note publish error',
        description: error.data?.message,
        color: 'red',
      })
    } finally {
      finish()
    }
  }

  return { loading, publish }
}
