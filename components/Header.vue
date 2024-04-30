<script setup lang="ts">
const props = defineProps<{
  title: string;
  isLogged: boolean;
}>();

const emit = defineEmits<{
  (e: "login"): void;
  (e: "logout"): void;
  (e: "new"): void;
  // @TODO: handle theme toggleing
  (e: "toggle-theme"): void;
}>();
</script>

<template>
  <header class="flex justify-between items-center py-5">
    <nuxt-link to="/" class="text-lg font-bold">{{ props.title }}</nuxt-link>

    <div class="flex gap-1">
      <template v-if="props.isLogged">
        <UButton
          color="gray"
          variant="solid"
          icon="i-heroicons-pencil-square"
          @click="() => emit('new')"
        >
          New
        </UButton>

        <UButton @click="() => emit('logout')"> Logout </UButton>
      </template>

      <UButton @click="() => emit('login')" v-else>Login</UButton>
    </div>
  </header>
</template>
