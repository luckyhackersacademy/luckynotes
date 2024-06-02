export interface NoteViewOptions {
  slug: string
  userId: Ref<string | undefined>
}

export function useNoteView({ slug, userId }: NoteViewOptions) {
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  const view = async () => {
    start()

    try {
      await $fetch(`/api/notes/${slug}/view`, {
        method: 'POST',
        body: {
          userId: userId.value,
        },
      })
    } catch (_) {
    } finally {
      finish()
    }
  }

  watchEffect(() => {
    if (!userId.value) {
      return
    }

    view()
  })

  return {
    view,
    loading,
  }
}
