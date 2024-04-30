<script setup lang="ts">
import type { NoteVirtual } from "~/entities/Note";

const { name, host, header } = useAppConfig();
const route = useRoute();
const { loggedIn, fetch: refreshSession, clear } = useUserSession();

const { data: note, refresh } = await useFetch<NoteVirtual>(
  `/api/notes/${route.params.slug}`,
);

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
console.log("note", note);
</script>

<template>
  <MDCRenderer :body="note?.parsed" class="body" />
</template>
