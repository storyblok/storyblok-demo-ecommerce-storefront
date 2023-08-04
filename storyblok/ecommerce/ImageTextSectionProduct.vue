<script setup>
import swell from 'swell-js'

const config = useRuntimeConfig()
const props = defineProps({ blok: Object })

let myEcommerceProducts = []
swell.init(config.public.swellStoreName, config.public.swellAccessToken)
const { pending, data: ecommerceProducts } = await useLazyAsyncData(
  'ecommerceProducts',
  () =>
    Promise.all(
      props.blok.product.items.map((product) => swell.products.get(product.id))
    )
)

watch(ecommerceProducts, (newEcommercProducts) => {
  myEcommerceProducts = newEcommercProducts.reduce((acc, curr) => {
    acc[curr.id] = curr
    console.log(curr)
    return acc
  }, {})
})

const button = {
  size: 'default',
  style: 'ghost',
  button_color: 'white',
}
</script>

<template>
  <section
    v-editable="blok"
    class="page-section image-text-section-product"
    :class="'bg-' + blok.background_color"
  >
    <div
      class="container grid items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2"
    >
      <div
        class="order-last text-left"
        :class="blok.reverse_layout ? '' : 'lg:order-first'"
      >
        <Headline
          :color="blok.background_color === 'dark' ? 'white' : 'dark'"
          class="text-left"
          v-if="blok.headline"
        >
          {{ blok.headline }}
        </Headline>
        <RichText
          :text="blok.text"
          :class="{ 'prose-invert': blok.background_color === 'dark' }"
        />
        <Button
          :button="button"
          :link="
            'products/' + myEcommerceProducts[blok.product.items[0].id].slug
          "
          v-if="!pending && blok.product.items && blok.product.items.length > 0"
          class="mt-8"
        >
          Shop now
        </Button>
      </div>
      <div>
        <LoadingSpinner v-if="pending" />
        <div v-else>
          <img
            v-if="blok.product.items && blok.product.items.length > 0"
            :src="
              myEcommerceProducts[blok.product.items[0].id].images[0].file.url
            "
            :alt="blok.product.items[0].name"
            class="pointer-events-none aspect-square w-full max-w-md rounded-lg object-cover shadow-2xl lg:aspect-auto lg:max-w-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>
