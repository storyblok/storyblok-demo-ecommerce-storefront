<script setup>
import swell from 'swell-js'

const config = useRuntimeConfig()
const props = defineProps({ blok: Object })

let myEcommerceProducts = []
swell.init(config.public.swellStoreName, config.public.swellAccessToken)
const { pending, data: ecommerceProducts } = useLazyAsyncData(
  'ecommerceProductsFP',
  () =>
    Promise.all(
      props.blok.products.items.map((product) => swell.products.get(product.id))
    )
)

watch(ecommerceProducts, (newEcommercProducts) => {
  myEcommerceProducts = newEcommercProducts.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
})

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

<template>
  <section
    v-editable="blok"
    class="page-section featured-products-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container text-left">
      <Headline
        :color="blok.background_color === 'dark' ? 'white' : 'dark'"
        class="text-left"
        v-if="blok.headline"
        >{{ blok.headline }}</Headline
      >
      <Lead
        v-if="blok.lead"
        :class="blok.background_color === 'dark' ? 'text-white' : 'text-dark'"
      >
        {{ blok.lead }}
      </Lead>
      <div :class="gridClasses">
        <LoadingSpinner v-if="pending" />
        <ProductCard
          v-else
          v-for="product in blok.products.items"
          :key="product.id"
          :product="myEcommerceProducts[product.id]"
          :section-bg-color="blok.background_color"
        />
      </div>
    </div>
  </section>
</template>
