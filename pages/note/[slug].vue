<script setup lang="ts">
import type { NoteVirtual } from "~/entities/Note";
const { name, host, header } = useAppConfig();
const route = useRoute();
const { loggedIn } = useUserSession();

const { data: note, refresh } = await useFetch<NoteVirtual>(
  `/api/notes/${route.params.slug}`,
);

const { loading, update, autosave } = useNoteUpdate({
  slug: route.params.slug as string,
  note,
});

const editor = ref<HTMLElement>();
const isEditing = ref(false);

const enableEditMode = async () => {
  if (!loggedIn.value) {
    return;
  }

  isEditing.value = true;

  await nextTick();
  editor.value?.focus();

  autogrow();
};

const autogrow = () => {
  if (!editor.value) return;
  editor.value.style.height = "5px";
  editor.value.style.height = `${editor.value.scrollHeight}px`;
};

const handleNoteUpdate = async () => {
  await update();
  refresh();
  isEditing.value = false;
};

useSeoMeta({
  titleTemplate: "%s | Luckynotes",
  title: () => name || "Missing name",
  description: () => header.description || "Missing description",
  ogTitle: () => `${name} | Luckynotes`,
});

defineOgImageComponent("Main", {
  title: name || "Missing name",
  description: header.description || "Missing description",
  host: host || "Missing host",
});
</script>

<template>
  <div class="flex justify-end gap-2" v-if="loggedIn && !isEditing">
    <UButton @click="enableEditMode">Edit this page</UButton>
  </div>

  <NoteTitle v-if="note" :title="note.title" :created-at="note.createdAt" />

  <form
    v-if="isEditing"
    class="editor-wrapper"
    @submit.prevent="handleNoteUpdate"
  >
    <textarea
      v-if="note"
      ref="editor"
      v-model="note.content"
      class="min-h-[300px] border-0 h-full w-full outline-none resize-none"
      @blur="autosave"
      @input="autogrow"
    />

    <div class="flex gap-2">
      <UButton type="submit">
        {{ loading ? "Saving" : "Save this note" }}
      </UButton>
      <UButton
        icon="i-heroicons-trash-16-solid"
        color="red"
        @click="enableEditMode"
      >
        Delete
      </UButton>
    </div>
  </form>

  <MDCRenderer :body="note?.parsed" class="body" />
</template>
