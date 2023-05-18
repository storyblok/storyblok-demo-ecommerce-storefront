<script setup>
defineProps({ product: Object, sectionBgColor: String })
</script>

<template>
  <NuxtLink
    :to="'/products/' + product.slug"
    v-if="product"
    class="max-w-md w-full flex flex-col h-full rounded-lg overflow-hidden group transform transition-all duration-300 group"
  >
    <div class="w-full aspect-square overflow-hidden">
      <img
        v-if="product?.images[0]?.file.url"
        :src="product?.images[0]?.file.url"
        :alt="product.images[0].file.url && product.meta_title"
        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 transform pointer-events-none"
      />
    </div>
    <div class="grow mt-4 text-left flex justify-between">
      <div>
        <h3
          class="text-xl"
          :class="sectionBgColor === 'dark' ? 'text-white' : 'text-dark'"
        >
          {{ product.name }}
        </h3>
        <PriceWithCurrency
          v-if="product.price && product.currency"
          :price="product.price"
          :currency="product.currency"
        />
      </div>
    </div>
  </NuxtLink>
</template>
