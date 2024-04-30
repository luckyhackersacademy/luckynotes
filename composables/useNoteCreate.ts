import type { NoteVirtual } from "~/entities/Note";

export function useNoteCreate() {
  const toast = useToast();
  const title = ref<string>();
  const slug = ref<string>();
  const loading = ref<boolean>(false);

  const create = async () => {
    loading.value = true;

    try {
      const response = await $fetch<NoteVirtual>("/api/notes", {
        method: "POST",
        body: {
          title: title.value,
          content: "# Hello world!",
        },
      });

      slug.value = response.slug;
    } catch (error) {
      toast.add({
        title: "Note create error",
        description: error.data?.message,
        color: "red",
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    title,
    slug,
    create,
  };
}
