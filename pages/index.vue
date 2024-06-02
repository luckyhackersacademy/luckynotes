<script setup lang="ts">
import type { NoteVirtual } from '~/entities/Note'

const { name, host, header } = useAppConfig()
const { loggedIn } = useUserSession()

const { data: response, refresh } = await useFetch<NoteVirtual[]>('/api/notes/')

watch(loggedIn, () => refresh())

const { loading, results, loadMore } = useNoteLoadMore()

const hasMore = computed(() => {
  return response.value.results.length < response.value.total
})

const handleLoadMore = async () => {
  await loadMore()
  response.value.results.push(...results.value)
}

useSeoMeta({
  titleTemplate: '%s | Luckynotes',
  title: () => name || 'Missing name',
  description: () => header.description || 'Missing description',
  ogTitle: () => `${name} | Luckynotes`,
})

defineOgImageComponent('Main', {
  title: header.description || 'Missing description',
  description: name || 'Missing name',
  host: host || 'Missing host',
})
</script>

<template>
  <Hero :title="header.title" :description="header.description" />

  <NoteList v-if="response.results?.length">
    <nuxt-link v-for="note in response.results" :key="note.slug" :to="`/note/${note.slug}`">
      <NoteItem :is-draft="note.isDraft" :created-at="note.createdAt" :title="note.title" />
    </nuxt-link>

    <div class="mt-10" v-if="hasMore">
      <UButton :loading="loading" color="gray" variant="solid" icon="i-heroicons-arrow-path" @click="handleLoadMore">
        Load more
      </UButton>
    </div>
  </NoteList>

  <EmptyTextSection v-else>
    <p>There are no notes to show yet.</p>
  </EmptyTextSection>
</template>
