<script setup>
const props = defineProps({ category: Object, sectionBgColor: String })
</script>

<template>
  <NuxtLink
    :to="'/product-categories/' + props.category.slug"
    v-if="category"
    class="max-w-md w-full flex flex-col h-full rounded-lg overflow-hidden group transform transition-all duration-300 group"
  >
    <div class="w-full aspect-square overflow-hidden">
      <img
        v-if="category?.images[0]?.file.url"
        :src="category?.images[0]?.file.url"
        :alt="category.images[0].file.url && category.meta_title"
        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 transform pointer-events-none"
      />
    </div>
    <div class="grow mt-4 text-left flex justify-between">
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
