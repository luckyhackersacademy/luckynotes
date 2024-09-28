<script setup lang="ts">
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const props = defineProps<{
  createdAt: string;
  isDraft: boolean;
  title: string;
}>();

const time = computed(() => {
  return dayjs(props.createdAt).format("LL");
});
</script>

<template>
  <li class="flex flex-col md:flex-row gap-0 md:gap-2">
    <span class="underline">
      {{ props.title }}

      <UBadge v-if="props.isDraft" color="yellow" variant="solid">Draft</UBadge>
    </span>

    <time class="opacity-75 w-auto text-gray-600 dark:text-gray-200" v-if="props.createdAt">
      {{ time }}
    </time>
  </li>
</template>
