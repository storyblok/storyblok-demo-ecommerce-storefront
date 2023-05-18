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

const loadCart = async function () {
  let cart = await swell.cart.get()
  return cart
}
const addToCart = async function (id) {
  let cart = await swell.cart.addItem({
    product_id: product.id,
    quantity: 1,
  })
}
</script>
<template>
  <StoryblokComponent v-for="blok in blok.bloks_above" :key="blok._uid" :blok="blok" />
  <section v-editable="blok" class="page-section single-product bg-dark">
    <LoadingSpinner v-if="pending" />
    <div v-else class="container grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center">
      <div>
        <img
          class="rounded-lg shadow-2xl pointer-events-none w-full max-w-md lg:max-w-full aspect-square lg:aspect-auto object-cover"
          :src="product.images[0].file.url" :alt="product.name" />
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
          <PriceWithCurrency v-if="product.price && product.currency" :price="product.price" :currency="product.currency"
            class="text-white text-xl font-serif" />
          <!--TODO: style add to cart button-->
          <button @click.prevent="addToCart(product.id)">Add to cart</button>
        </div>
      </div>
    </div>
  </section>
  <StoryblokComponent v-for="blok in blok.bloks_below" :key="blok._uid" :blok="blok" />
</template>
