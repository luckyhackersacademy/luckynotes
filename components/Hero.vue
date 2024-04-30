<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="flex flex-col py-10">
    <h1 class="font-bold text-2xl">{{ props.title }}</h1>
    <p class="text-xl">{{ props.description }}</p>
  </div>
</template>
