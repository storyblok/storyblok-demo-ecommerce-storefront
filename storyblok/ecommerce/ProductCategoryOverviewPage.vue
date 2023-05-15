<script setup>
import swell from 'swell-js'

const config = useRuntimeConfig()
const props = defineProps({ blok: Object })

let categories = []
swell.init(config.public.swellStoreName, config.public.swellAccessToken)
const { pending, data: ecommerceCategories } = await useLazyAsyncData(
  'ecommerceCategoriesFeatured',
  () =>
    swell.categories.list({
      active: true,
      sort: 'name asc',
    })
)

watch(ecommerceCategories, (newEcommerceCategories) => {
  categories = newEcommerceCategories.results.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
})

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

<template>
  <main :class="'bg-' + blok.background_color" v-editable="blok">
    <section class="container py-12 md:py-16">
      <Headline
        v-if="blok.headline"
        :color="blok.background_color === 'dark' ? 'white' : 'dark'"
        >{{ blok.headline }}</Headline
      >
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
      <div :class="gridClasses">
        <LoadingSpinner v-if="pending" />
        <CategoryCard
          v-else
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :section-bg-color="blok.background_color"
        />
      </div>
    </section>
  </main>
</template>
