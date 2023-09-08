<script setup>
/**
 * Note: This component is used to render both product-category-page-hero and product-category-page-default
 */
const props = defineProps({ blok: Object, productCategorySlug: String })

const category = ref(null)
const pendingCategory = ref(true)
const products = ref(null)
const pendingProducts = ref(true)

try {
  category.value = await fetchShopifyCollectionByHandle(
    props.productCategorySlug,
  )
  pendingCategory.value = false
  try {
    products.value = await fetchShopifyProductsByCategory(category.value.id)
    pendingProducts.value = false
  } catch (error) {
    console.log(error)
    pendingProducts.value = false
  }
} catch (error) {
  console.log(error)
  pendingCategory.value = false
}

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
    class="page-section"
    :class="'bg-' + blok.background_color"
  >
    <LoadingSpinner v-if="pendingCategory && !category" />
    <div v-if="!pendingCategory && category" class="container">
      <div
        class="relative mb-12 flex h-[500px] w-full items-center justify-center"
      >
        <img
          v-if="category.image"
          :src="category.image"
          :alt="category.title"
          class="pointer-events-none absolute left-0 top-0 z-0 h-full w-full object-cover"
        />
        <Headline class="relative z-10 text-white">
          {{ category.title }}
        </Headline>
      </div>
      <LoadingSpinner v-if="pendingProducts && !products" />
      <div v-if="!pendingProducts && products" :class="gridClasses">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product-id="product.id"
          :section-bg-color="blok.background_color"
        />
      </div>
    </div>
    <div v-else class="container">
      <Headline color="white" class="text-left">
        Category
        <span class="text-light">{{ productCategorySlug }}</span>
        doesn't exist.
      </Headline>
    </div>
  </section>
  <StoryblokComponent
    v-for="blok in blok.bloks_below"
    :key="blok._uid"
    :blok="blok"
  />
</template>
