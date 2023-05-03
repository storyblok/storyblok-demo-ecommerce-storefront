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
      limit: 4,
      page: 1,
      active: true,
      sort: 'name asc',
    })
)

watch(ecommerceCategories, (newEcommerceCategories) => {
  console.log(newEcommerceCategories)
  categories = newEcommerceCategories.results.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
})

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

<template>
  <section
    v-editable="blok"
    class="page-section featured-categories-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container text-center">
      <Headline color="black" class="text-left" v-if="blok.headline">{{
        blok.headline
      }}</Headline>
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
        />
      </div>
    </div>
  </section>
</template>
