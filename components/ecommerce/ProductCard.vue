<script setup>
const props = defineProps({ productID: String, sectionBgColor: String })

const product = ref(null)

watchEffect(async () => {
  product.value =
    props.productID && (await fetchShopifyProductData(props.productID))
})
</script>

<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    v-if="product"
    class="group group flex h-full w-full max-w-md transform flex-col overflow-hidden rounded-lg transition-all duration-300"
  >
    <div class="aspect-square w-full overflow-hidden">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.title"
        class="pointer-events-none h-full w-full transform object-cover transition-all duration-700 group-hover:scale-110"
      />
    </div>
    <div class="mt-4 flex grow justify-between text-left">
      <div>
        <h3
          class="text-xl"
          :class="sectionBgColor === 'dark' ? 'text-white' : 'text-dark'"
        >
          {{ product.title }}
        </h3>
        <PriceWithCurrency
          v-if="product.price && product.priceCurrency"
          :price="String(product.price)"
          :currency="product.priceCurrency"
          :class="sectionBgColor === 'dark' ? 'text-white' : 'text-medium'"
        />
      </div>
    </div>
  </NuxtLink>
  <LoadingSpinner v-else />
</template>
