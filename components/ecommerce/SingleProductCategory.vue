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

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>
<template>
  <StoryblokComponent
    v-for="blokabove in blok.bloks_above"
    :key="blokabove._uid"
    :blok="blokabove"
  />
  <section
    v-editable="blok"
    class=""
    :class="'bg-' + blok.background_color"
  >
    <div class="container">
      <LoadingSpinner v-if="pendingCategory" />
      <div
        v-else
        class="relative w-full h-[500px] flex items-center justify-center mb-12"
      >
        <img
          v-if="category?.images[0]?.file.url"
          :src="category?.images[0]?.file.url"
          :alt="category.images[0].file.url && category.meta_title"
          class="absolute top-0 left-0 z-0 w-full h-full object-cover pointer-events-none"
        />
        <Headline class="relative z-10 text-white">{{
          category.name
        }}</Headline>
      </div>
      <LoadingSpinner v-if="pendingProducts" />
      <div v-else :class="gridClasses">
        <ProductCard
          v-for="product in products.results"
          :key="product.id"
          :product="product"
          :section-bg-color="blok.background_color"
        />
      </div>
    </div>
  </section>
  <StoryblokComponent
    v-for="blok in blok.bloks_below"
    :key="blok._uid"
    :blok="blok"
  />
</template>
