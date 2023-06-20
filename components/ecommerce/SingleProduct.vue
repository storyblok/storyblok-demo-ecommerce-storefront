<script setup>
/**
 * Note: This component is used to render both product-page-hero and product-page-default
 */
import swell from 'swell-js'
const props = defineProps({ blok: Object, productSlug: String })

const config = useRuntimeConfig()

let product = {}
swell.init(config.public.swellStoreName, config.public.swellAccessToken)
const { pending, data: ecommerceProduct } = useLazyAsyncData(
  'ecommerceProduct',
  function () {
    return swell.products.get(props.productSlug)
  }
)

watch(ecommerceProduct, (newEcommerceProduct) => {
  product = newEcommerceProduct
})

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
    <LoadingSpinner v-if="pending" />
    <div
      v-else-if="!pending && product.images"
      class="container grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-start"
    >
      <div>
        <img
          class="rounded-lg shadow-2xl pointer-events-none w-full max-w-md lg:max-w-full aspect-square lg:aspect-auto object-cover"
          :src="product.images[0].file.url"
          :alt="product.name"
        />
      </div>
      <div class="text-left">
        <Headline color="white" class="text-left" v-if="blok.headline">{{
          blok.headline
        }}</Headline>
        <RichText :text="blok.description" class="prose-invert" />
        <div class="mt-12">
          <Headline color="white" size="small">{{ product.name }}</Headline>
          <div class="prose prose-invert">
            <ul>
              <li v-for="benefit in product.content.product_benefits">
                {{ benefit.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="flex items-center space-x-8 mt-12">
          <PriceWithCurrency
            v-if="product.price && product.currency"
            :price="String(product.price)"
            :currency="product.currency"
            class="text-white text-xl font-serif"
          />
          <Button @click.prevent="addToCart(product.id)" :button="button"
            >Add to cart</Button
          >
        </div>
      </div>
    </div>
    <div v-else>
      <Headline color="white" class="text-left">
        Product <span class="text-zinc-400">{{ productSlug }}</span> doesn't
        exist
      </Headline>
    </div>
  </section>
  <StoryblokComponent
    v-for="blok in blok.bloks_below"
    :key="blok._uid"
    :blok="blok"
  />
</template>
