<script setup>
const props = defineProps({ category: Object, sectionBgColor: String })
</script>

<template>
  <NuxtLink
    :to="'/product-categories/' + props.category.slug"
    v-if="category"
    class="group group flex h-full w-full max-w-md transform flex-col overflow-hidden rounded-lg transition-all duration-300"
  >
    <div class="aspect-square w-full overflow-hidden">
      <img
        v-if="category?.images[0]?.file.url"
        :src="category?.images[0]?.file.url"
        :alt="category.images[0].file.url && category.meta_title"
        class="pointer-events-none h-full w-full transform object-cover transition-all duration-700 group-hover:scale-110"
      />
    </div>
    <div class="mt-4 flex grow justify-between text-left">
      <div>
        <h3
          class="text-xl"
          :class="sectionBgColor === 'dark' ? 'text-white' : 'text-dark'"
        >
          {{ category.name }}
        </h3>
      </div>
    </div>
  </NuxtLink>
</template>
