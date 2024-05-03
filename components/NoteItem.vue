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
    <time class="opacity-75 w-[120px]" v-if="props.createdAt">
      {{ time }}
    </time>
    <span>
      {{ props.title }}

      <UBadge v-if="props.isDraft" color="yellow" variant="solid">Draft</UBadge>
    </span>
  </li>
</template>
