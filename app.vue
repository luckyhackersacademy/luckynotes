<script setup lang="ts">
const { name, author } = useAppConfig();

useSeoMeta({
  ogSiteName: name,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterSite: author.twitter,
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtPage />
  <UNotifications />
</template>
