export interface Options {
  slug: Ref<string>;
}

export function useNoteDelete({ slug }: Options) {
  const toast = useToast();
  const loading = ref<boolean>(false);

  const remove = async () => {
    if (!slug.value) {
      return;
    }

    loading.value = true;

    try {
      await $fetch(`/api/notes/${slug}`, {
        method: "DELETE",
      });

      toast.add({
        title: "Note deleted!",
        color: "green",
      });
    } catch (error) {
      toast.add({
        title: "Note delete error",
        description: error.data?.message,
        color: "red",
      });
    } finally {
      loading.value = false;
    }
  };

  return { loading, remove };
}
