<script setup lang="ts">
const isOpen = defineModel("");
const password = ref<string>();

const props = defineProps<{
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "login", password: string): void;
}>();
</script>

<template>
  <UModal v-model="isOpen">
    <form
      @submit.prevent="() => emit('login', password)"
      class="flex flex-col gap-2 p-5"
    >
      <UFormGroup label="Admin password" name="password">
        <UInput v-model="password" type="password" />
      </UFormGroup>

      <div>
        <UButton type="submit">
          {{ props.loading ? "Loading" : "Login" }}
        </UButton>
      </div>
    </form>
  </UModal>
</template>
