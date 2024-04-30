<script setup lang="ts">
const isOpen = defineModel({
  default: false,
});

const name = ref<string>("");

const props = defineProps<{
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "new", name: string): void;
}>();
</script>

<template>
  <UModal v-model="isOpen">
    <form
      @submit.prevent="() => emit('new', name)"
      class="flex flex-col gap-2 p-5"
    >
      <UFormGroup label="Name your note" name="name">
        <UInput v-model="name" type="text" />
      </UFormGroup>

      <div>
        <UButton type="submit">
          {{ props.loading ? "Loading" : "Create" }}
        </UButton>
      </div>
    </form>
  </UModal>
</template>
