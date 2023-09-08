<script setup>
/**
 * Note: This component is used to render both product-page-hero and product-page-default
 */

const props = defineProps({ blok: Object, productSlug: String })

const product = ref(null)
const pending = ref(true)

try {
  product.value = await fetchShopifyProductByHandle(props.productSlug)
  pending.value = false
} catch (error) {
  console.log(error)
  pending.value = false
}

const { addToCart } = useCart()

const button = {
  size: 'default',
  style: 'default',
  button_color: 'white',
}
</script>
<template>
  <StoryblokComponent
    v-for="blok in blok.bloks_above"
    :key="blok._uid"
    :blok="blok"
  />
  <section v-editable="blok" class="page-section single-product bg-dark">
    <LoadingSpinner v-if="pending && !product" />
    <div
      v-if="!pending && product"
      class="container grid items-start gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2"
      :id="product.slug"
    >
      <div>
        <img
          v-if="product"
          :src="product.image"
          :alt="product.title"
          class="pointer-events-none aspect-square w-full max-w-md rounded-lg object-cover shadow-2xl lg:aspect-auto lg:max-w-full"
        />
      </div>
      <div class="text-left">
        <Headline color="white" class="text-left" v-if="blok.headline">
          {{ blok.headline }}
        </Headline>
        <RichText :text="blok.description" class="prose-invert" />
        <div class="mt-12">
          <Headline color="white" size="small">{{ product.title }}</Headline>
          <div class="prose prose-invert" v-html="product.description"></div>
        </div>
        <div class="mt-12 flex items-center space-x-8">
          <PriceWithCurrency
            v-if="product.price && product.priceCurrency"
            :price="String(product.price)"
            :currency="product.priceCurrency"
            class="font-serif text-xl text-white"
          />
          <Button
            @click.prevent="addToCart(product.variantId)"
            :button="button"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <Headline color="white" class="text-left">
        Product
        <span class="text-light">{{ productSlug }}</span>
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
