<script setup>
const props = defineProps({ productId: String, sectionBgColor: String })

const product = ref(null)
const pending = ref(true)

watchEffect(async () => {
  try {
    product.value = await fetchShopifyProductByID(
      props.blok?.product?.items[0]?.id,
    )
    pending.value = false
  } catch (error) {
    console.log(error)
    pending.value = false
  }
})
</script>

<template>
  <LoadingSpinner v-if="pending && !product" />
  <NuxtLink
    :to="`/products/${product.slug}`"
    v-if="!pending && product"
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
