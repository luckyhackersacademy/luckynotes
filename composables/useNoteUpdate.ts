import type { NoteVirtual } from "~/entities/Note";

export interface Options {
  slug: string;
  note: Ref<NoteVirtual | null>;
}

export function useNoteUpdate({ slug, note }: Options) {
  const toast = useToast();
  const loading = ref<boolean>(false);

  const autosave = async () => {
    if (!slug || !note.value) {
      return;
    }

    loading.value = true;

    try {
      await $fetch(`/api/notes/${slug}`, {
        method: "PUT",
        body: {
          ...note.value,
        },
      });

      toast.add({
        title: "Note autosaved!",
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

  const update = async () => {
    if (!slug || !note.value) {
      return;
    }

    loading.value = true;

    try {
      await $fetch(`/api/notes/${slug}`, {
        method: "PUT",
        body: {
          ...note.value,
        },
      });

      toast.add({
        title: "Note updated!",
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

  return { loading, update, autosave };
}
