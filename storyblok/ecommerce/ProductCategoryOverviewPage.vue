<script setup>
import swell from 'swell-js'
const props = defineProps({ blok: Object })

const config = useRuntimeConfig()

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
  console.log(newEcommerceCategories)
  categories = newEcommerceCategories.results.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})
})

const gridClasses = computed(() => {
  let gridClasses =
    'grid md:grid-cols-2 gap-10 md:gap-12 md:mt-12 place-items-center items-start'
  gridClasses += ' lg:grid-cols-3 xl:grid-cols-4'

  return gridClasses
})
</script>

<template>
  <section v-editable="blok" class="page-section">
    <pre>{{ blok }}</pre>
    <!-- TODO: needs styling -->
    <h1
      class="mt-5 mx-16 p-3 text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight font-black mb-4"
    >
      {{ blok.headline }}
    </h1>
    <div :class="gridClasses" class="bg-white">
      <div v-if="pending" class="flex items-center justify-center">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
      <CategoryCard
        v-else
        v-for="category in categories"
        :key="category.id"
        :category="category"
        :class="gridCardColor"
        theme="light"
      />
    </div>
  </section>
</template>
