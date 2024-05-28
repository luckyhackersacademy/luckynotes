<script setup lang="ts">
const props = defineProps<{
  likes: number
  views: number
  alreadyLiked: boolean
}>()

const emit = defineEmits<{
  (e: 'like'): void
}>()

const viewLabel = computed(() => {
  if (props.views > 1) {
    return `${props.views} views`
  }

  return `${props.views} view`
})

const likeLabel = computed(() => {
  if (props.likes > 1) {
    return `${props.likes} likes`
  }

  return `${props.likes} like`
})
</script>

<template>
  <div class="flex gap-2">
    <UButton icon="i-heroicons-chart-bar" disabled color="cyan" variant="soft"> {{ viewLabel }} </UButton>
    <UButton
      @click="() => emit('like')"
      icon="i-heroicons-hand-thumb-up"
      :disabled="props.alreadyLiked"
      color="cyan"
      variant="soft"
    >
      {{ likeLabel }}
    </UButton>
  </div>
</template>
