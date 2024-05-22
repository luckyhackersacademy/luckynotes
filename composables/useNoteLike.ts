export interface NoteLikeOptions {
  slug: string
  userId: Ref<string | undefined>
}

export interface NoteLikeResponse {
  id: string
}

export function useNoteLike({ slug, userId }: NoteLikeOptions) {
  const toast = useToast()
  const liked = ref<boolean>(true)
  const { start, finish, isLoading: loading } = useLoadingIndicator()

  const like = async () => {
    if (liked.value) {
      return
    }

    start()

    try {
      const response = await $fetch<NoteLikeResponse>(`/api/notes/${slug}/like`, {
        method: 'POST',
        body: {
          userId: userId.value,
        },
      })

      if (response.id) {
        liked.value = true
      }
    } catch (error) {
      toast.add({
        title: 'Fail on like note',
        description: error.data?.message,
        color: 'red',
      })
    } finally {
      finish()
    }
  }

  watchEffect(async () => {
    if (!userId.value) {
      return
    }

    try {
      await $fetch<NoteLikeResponse>(`/api/notes/${slug}/like/${userId.value}`, {
        method: 'GET',
      })

      liked.value = true
    } catch (_) {
      liked.value = false
    }
  })

  return {
    liked,
    like,
    loading,
  }
}
