<script setup lang="ts">
const { name, author } = useAppConfig();
const { loggedIn, fetch: refreshSession, clear } = useUserSession();

const authModalIsOpen = ref(false);
const createNoteModalIsOpen = ref(false);

const router = useRouter();
const { loading, password, login } = useLogin();
const { loading: creating, title, slug, create } = useNoteCreate();

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
  createNoteModalIsOpen.value = false;
  router.push(`/note/${slug.value}`);
};

useSeoMeta({
  ogSiteName: name,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: author.twitter,
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

    <NuxtLoadingIndicator color="cyan" />

    <div class="w-full pb-48">
      <NuxtPage />
    </div>

    <Footer :twitter="author.twitter" />

    <UNotifications />
  </UContainer>
</template>
