<script setup>
const props = defineProps({ blok: Object })
</script>

<template>
  <div
    class="w-full max-w-md lg:max-w-none h-full flex flex-col"
    v-editable="blok"
  >
    <img
      v-if="blok.image.filename"
      :src="blok.image.filename + '/m/900x600'"
      :alt="blok.name"
      class="mx-auto mb-6 pointer-events-none rounded-lg shadow-lg"
    />
    <div class="grow text-dark">
      <div>
        <h3 class="font-serif mb-2 text-xl">
          {{ blok.name }}
        </h3>
        {{ blok.description }}
      </div>
    </div>
  </div>
</template>
