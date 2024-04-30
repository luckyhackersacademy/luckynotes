<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
  title: string;
}>();

const time = computed(() => {
  return dayjs(props.createdAt).format("LL");
});
</script>

<template>
  <div class="flex flex-col py-5">
    <h1 class="font-bold text-2xl">{{ props.title }}</h1>
    <p class="text-xl font-italic">Note written on {{ time }}</p>
  </div>
</template>
