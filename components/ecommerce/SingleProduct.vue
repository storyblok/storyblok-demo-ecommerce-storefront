<script setup>
/**
 * Note: This component is used to render both product-page-hero and product-page-default
 */
import swell from 'swell-js'
const props = defineProps({ blok: Object, productSlug: String })
console.log('productSlug: ' + props.productSlug)

const config = useRuntimeConfig()

let product = {}
swell.init(config.public.swellStoreName, config.public.swellAccessToken)
//swell.currency.select('USD');
const { pending, data: ecommerceProduct } = useLazyAsyncData(
  'ecommerceProduct',
  function () {
    return swell.products.get(props.productSlug)
  }
)

watch(ecommerceProduct, (newEcommerceProduct) => {
  console.log(newEcommerceProduct)
  product = newEcommerceProduct
})

const loadCart = async function () {
  let cart = await swell.cart.get()
  console.log(cart)
  return cart
}
const addToCart = async function (id) {
  console.log(id)
  console.log(swell)
  let cart = await swell.cart.addItem({
    product_id: product.id,
    quantity: 1,
  })
  console.log(cart)
}
</script>
<template>
  <section v-editable="blok" class="page-section image-text-section bg-black">
    <div class="container items-center">
      <div>
        <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
      </div>
      <div>
        <LoadingSpinner v-if="pending" />
        <div class="items-center justify-center" v-else>
          <LazyProductCardDetail :product="product" :slug="product.slug" />
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-100"
              >{{ product.currency }} {{ product.price }}</span
            >
            <button @click.prevent="addToCart(product.id)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
