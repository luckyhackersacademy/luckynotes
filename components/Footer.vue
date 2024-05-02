<script setup lang="ts">
const props = defineProps<{
  twitter: string;
}>();
</script>

<template>
  <footer class="flex flex-col py-5">
    <span class="text-sm flex flex-col">
      Doubts about some note? send me a DM on Twitter
      <a
        class="text-primary"
        :href="`https://twitter.com/${props.twitter}`"
        target="_blank"
      >
        <UIcon name="i-bi-twitter-x" dynamic />
        @{{ props.twitter }}
      </a>
    </span>
  </footer>
</template>
