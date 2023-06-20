<script setup>
defineProps({ product: Object, sectionBgColor: String })
</script>

<template>
  <NuxtLink
    :to="'/products/' + product.slug"
    v-if="product"
    class="group group flex h-full w-full max-w-md transform flex-col overflow-hidden rounded-lg transition-all duration-300"
  >
    <div class="aspect-square w-full overflow-hidden">
      <img
        v-if="product?.images[0]?.file.url"
        :src="product?.images[0]?.file.url"
        :alt="product.images[0].file.url && product.meta_title"
        class="pointer-events-none h-full w-full transform object-cover transition-all duration-700 group-hover:scale-110"
      />
    </div>
    <div class="mt-4 flex grow justify-between text-left">
      <div>
        <h3
          class="text-xl"
          :class="sectionBgColor === 'dark' ? 'text-white' : 'text-dark'"
        >
          {{ product.name }}
        </h3>
        <PriceWithCurrency
          v-if="product.price && product.currency"
          :price="String(product.price)"
          :currency="product.currency"
        />
      </div>
    </div>
  </NuxtLink>
</template>
