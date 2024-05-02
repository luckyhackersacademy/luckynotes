<script setup lang="ts">
import type { NoteVirtual } from "~/entities/Note";
const { name, host, header } = useAppConfig();
const route = useRoute();
const router = useRouter();
const { loggedIn } = useUserSession();

const { data: note, refresh } = await useFetch<NoteVirtual>(
  `/api/notes/${route.params.slug}`,
);

const { loading: publishing, publish } = useNotePublish({
  slug: route.params.slug as string,
});

const { loading: deleting, remove } = useNoteDelete({
  slug: route.params.slug as string,
});

const { loading, update } = useNoteUpdate({
  slug: route.params.slug as string,
  note,
});

const editor = ref<HTMLElement>();
const isEditing = ref(false);

const handlePublish = async () => {
  await publish();
  refresh();
};

const handleDelete = async () => {
  await remove();
  router.push("/");
};

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
  title: note.value?.title || "Missing name",
  description: header.description || "Missing description",
  host: host || "Missing host",
});
</script>

<template>
  <NoteTitle v-if="note" :title="note.title" :created-at="note.createdAt">
    <template #right>
      <div class="flex justify-end gap-2" v-if="loggedIn && !isEditing">
        <UButton color="gray" @click="enableEditMode">Edit this page</UButton>
        <UButton
          v-if="note.isDraft"
          icon="i-heroicons-check-circle"
          @click="handlePublish"
        >
          {{ publishing ? "Publishing" : "Publish" }}
        </UButton>
      </div>
    </template>
  </NoteTitle>

  <UDivider />

  <article class="prose prose-primary dark:prose-invert">
    <MDCRenderer
      v-if="!isEditing"
      :body="note?.parsed.body"
      :data="note?.parsed.data"
      class="w-full mt-5"
    />
  </article>

  <form v-if="isEditing" class="mt-5" @submit.prevent="handleNoteUpdate">
    <textarea
      v-if="note"
      ref="editor"
      v-model="note.content"
      class="w-full min-h-[300px] border-0 h-full w-full outline-none resize-none"
      @input="autogrow"
    />

    <div class="flex gap-2">
      <UButton type="submit">
        {{ loading ? "Saving" : "Save this note" }}
      </UButton>
      <UButton
        icon="i-heroicons-trash-16-solid"
        color="red"
        @click="handleDelete"
      >
        {{ deleting ? "Deleting" : "Delete" }}
      </UButton>
    </div>
  </form>
</template>
