<script setup lang="ts">
const { name, host, header } = useAppConfig();
const { loggedIn, fetch: refreshSession, clear } = useUserSession();
const colorMode = useColorMode();
const router = useRouter();
const { loading, password, login } = useLogin();
const { loading: creating, title, slug, create } = useNoteCreate();

colorMode.preference = "system";

const authModalIsOpen = ref(false);
const createNoteModalIsOpen = ref(false);

const { data: notes } = await useFetch("/api/notes/");

const handleAuthModal = () => {
  authModalIsOpen.value = true;
};

const handleCreateNoteModal = () => {
  createNoteModalIsOpen.value = true;
};

const handleLogin = async (pass: string) => {
  password.value = pass;

  await login();
  await refreshSession();

  authModalIsOpen.value = false;
};

const handleNewNote = async (name: string) => {
  title.value = name;
  await create();
  router.push(`/note/${slug.value}`);
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
  <UContainer>
    <Header
      :title="name"
      :is-logged="loggedIn"
      @new="handleCreateNoteModal"
      @logout="clear"
      @login="handleAuthModal"
    />
    <Hero :title="header.title" :description="header.description" />

    <AuthModal
      v-model="authModalIsOpen"
      :loading="loading"
      @login="handleLogin"
    />

    <NewNoteModal
      v-model="createNoteModalIsOpen"
      :loading="creating"
      @new="handleNewNote"
    >
    </NewNoteModal>

    <NoteList>
      <nuxt-link
        v-for="note in notes"
        :key="note.slug"
        :to="`/note/${note.slug}`"
      >
        <NoteItem :created-at="note.createdAt" :title="note.title" />
      </nuxt-link>
    </NoteList>
  </UContainer>
</template>
