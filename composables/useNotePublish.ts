export interface PublishOptions {
  slug: string;
}

export function useNotePublish({ slug }: PublishOptions) {
  const toast = useToast();
  const loading = ref<boolean>(false);

  const publish = async () => {
    if (!slug) {
      return;
    }

    loading.value = true;

    try {
      await $fetch(`/api/notes/${slug}/publish`, {
        method: "POST",
      });

      toast.add({
        title: "Note publish!",
        color: "green",
      });
    } catch (error) {
      toast.add({
        title: "Note publish error",
        description: error.data?.message,
        color: "red",
      });
    } finally {
      loading.value = false;
    }
  };

  return { loading, publish };
}
