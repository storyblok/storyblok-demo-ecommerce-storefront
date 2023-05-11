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
    return acc
  }, {})
})
</script>

<template>
  <section
    v-editable="blok"
    class="page-section image-text-section-product"
    :class="'bg-' + blok.background_color"
  >
    <div
      class="container grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center"
    >
      <div
        class="order-last text-left"
        :class="blok.reverse_layout ? '' : 'lg:order-first'"
      >
        <Headline
          :color="blok.background_color === 'dark' ? 'white' : 'dark'"
          class="text-left"
          v-if="blok.headline"
          >{{ blok.headline }}</Headline
        >
        <RichText
          :text="blok.text"
          :class="{ 'prose-invert': blok.background_color === 'dark' }"
        />
        <div v-if="!pending && blok.button.length" class="mt-8">
          <ButtonProduct
            v-for="button in blok.button"
            :key="button._uid"
            :product="myEcommerceProducts[blok.product.items[0].id]"
            :button="button"
          />
        </div>
      </div>
      <div>
        <LoadingSpinner v-if="pending" />
        <div v-else>
          <img
            v-if="!fixedHeightImages"
            :src="
              myEcommerceProducts[blok.product.items[0].id].images[0].file.url
            "
            :alt="blok.product.items[0].id"
            class="rounded-lg shadow-2xl pointer-events-none w-full max-w-md lg:max-w-full aspect-square lg:aspect-auto object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
