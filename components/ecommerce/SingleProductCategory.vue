<script setup>
/**
 * Note: This component is used to render both product-category-page-hero and product-category-page-default
 */
import swell from 'swell-js'
const props = defineProps({ blok: Object, productCategorySlug: String })

const config = useRuntimeConfig()

swell.init(config.public.swellStoreName, config.public.swellAccessToken)

const category = ref({})
const pendingCategory = ref(true)
watchEffect(async () => {
  swell.categories.get(props.productCategorySlug).then((result) => {
    category.value = result
    pendingCategory.value = false
  })
})

const products = ref({})
const pendingProducts = ref(true)
watchEffect(async () => {
  swell.products
    .list({ category: props.productCategorySlug })
    .then((result) => {
      products.value = result
      pendingProducts.value = false
    })
})
</script>
<template>
  <!-- TODO: needs styling -->
  <div v-editable="blok">
    <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
    <!-- <StoryblokComponent v-if="blok" :blok="blok" :uuid="blok.uuid" /> -->
  </div>
  <div v-if="pendingCategory" class="w-full flex items-center justify-center">
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
  </div>
  <CategoryCardDetail
    v-else
    :key="category.id"
    :category="category"
    theme="light"
  />

  <div v-if="pendingProducts" class="w-full flex items-center justify-center">
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
  </div>
  <div v-else class="items-center justify-center">
    <ProductCard
      v-for="product in products.results"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
