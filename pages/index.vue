<script setup lang="ts">
import type { NoteVirtual } from "~/entities/Note";

const { name, host, header } = useAppConfig();
const { loggedIn } = useUserSession();

const { data: notes, refresh } = await useFetch<NoteVirtual[]>("/api/notes/");
watch(loggedIn, () => refresh());

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
  <Hero :title="header.title" :description="header.description" />

  <NoteList v-if="notes?.length">
    <nuxt-link
      v-for="note in notes"
      :key="note.slug"
      :to="`/note/${note.slug}`"
    >
      <NoteItem
        :is-draft="note.isDraft"
        :created-at="note.createdAt"
        :title="note.title"
      />
    </nuxt-link>
  </NoteList>

  <AnyNotesToShow v-else />
</template>
