<script setup lang="ts">
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const props = defineProps<{
  createdAt: string;
  title: string;
}>();

const time = computed(() => {
  return dayjs(props.createdAt).format("LL");
});
</script>

<template>
  <li class="flex gap-4">
    <time>
      {{ time }}
    </time>
    <span>
      {{ props.title }}
    </span>
  </li>
</template>
