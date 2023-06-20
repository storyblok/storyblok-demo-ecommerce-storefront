<script setup>
const props = defineProps({ blok: Object })
</script>

<template>
  <div
    class="flex h-full w-full max-w-md flex-col lg:max-w-none"
    v-editable="blok"
  >
    <img
      v-if="blok.image.filename"
      :src="blok.image.filename + '/m/900x600'"
      :alt="blok.name"
      class="pointer-events-none mx-auto mb-6 rounded-lg shadow-lg"
    />
    <div class="grow text-dark">
      <div>
        <h3 class="mb-2 font-serif text-xl">
          {{ blok.name }}
        </h3>
        {{ blok.description }}
      </div>
    </div>
  </div>
</template>
