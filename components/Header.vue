<script setup lang="ts">
const props = defineProps<{
  title: string;
  isLogged: boolean;
}>();

const emit = defineEmits<{
  (e: "login"): void;
  (e: "logout"): void;
  // @TODO: handle theme toggleing
  (e: "toggle-theme"): void;
}>();
</script>

<template>
  <header class="flex justify-between items-center py-5">
    <span class="text-lg font-bold">{{ props.title }}</span>

    <div class="flex gap-1">
      <UButton @click="() => emit('logout')" v-if="props.isLogged">
        Logout
      </UButton>
      <UButton @click="() => emit('login')" v-else>Login</UButton>
    </div>
  </header>
</template>
