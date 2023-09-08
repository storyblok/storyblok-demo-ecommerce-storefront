<script setup>
const props = defineProps({ category: Object, sectionBgColor: String })
</script>

<template>
  <NuxtLink
    :to="'/product-categories/' + category.handle"
    v-if="category"
    class="group group flex h-full w-full max-w-md transform flex-col overflow-hidden rounded-lg transition-all duration-300"
  >
    <div class="aspect-square w-full overflow-hidden">
      <img
        v-if="category.image"
        :src="category.image"
        :alt="category.title"
        class="pointer-events-none h-full w-full transform object-cover transition-all duration-700 group-hover:scale-110"
      />
    </div>
    <div class="mt-4 flex grow justify-between text-left">
      <div>
        <h3
          class="text-xl"
          :class="sectionBgColor === 'dark' ? 'text-white' : 'text-dark'"
        >
          {{ category.title }}
        </h3>
      </div>
    </div>
  </NuxtLink>
</template>
