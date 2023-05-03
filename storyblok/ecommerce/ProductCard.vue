<script setup>
const props = defineProps({ product: Object, slug: String })

const url = computed(() => {
  return '/products/' + props.product.slug
})

const optimizedImage = computed(() => props.product?.images[0]?.file.url)
</script>

<template>
  <NuxtLink
    :to="url"
    v-if="product"
    class="max-w-md w-full flex flex-col h-full rounded-lg overflow-hidden group transform transition-all duration-300 shadow-sm hover:shadow-lg group"
  >
    <div class="w-full h-[210px] xl:h-[300px] overflow-hidden">
      <img
        :src="optimizedImage"
        :alt="product.images[0].file.url && product.meta_title"
        class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 transform pointer-events-none"
      />
    </div>
    <div class="grow mt-4 text-left bg-dark text-white flex justify-between">
      <div>
        <h3 class="text-xl">
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
