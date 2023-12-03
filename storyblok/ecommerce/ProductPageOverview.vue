<script setup>
const props = defineProps({ blok: Object })

const searchTerm = ref('')
const checkedCategories = ref([])
const rangePrice = ref(0)

const resetFilters = () => {
  searchTerm.value = ''
  checkedCategories.value = []
  rangePrice.value = 0
}

const categories = ref([])
categories.value = await fetchShopifyAllCollections()
console.log(categories.value)

const products = ref([])
const fetchProducts = async () => {
  try {
    products.value = await fetchShopifyProductsByCustomQuery(
      searchTerm.value,
      checkedCategories.value,
    )
  } catch (error) {
    console.log(error)
  }
}

fetchProducts()

watch([searchTerm, checkedCategories], () => {
  fetchProducts()
})

const gridClasses = computed(() => getGridClasses('4'))

const button = {
  link: {
    linktype: 'url',
  },
  size: 'small',
  style: 'ghost',
  text_color: 'light',
  background_color: 'dark',
}
</script>

<template>
  <section
    class="page-section product-overview"
    :class="'bg-' + blok.background_color"
    v-editable="blok"
  >
    <div class="container">
      <Headline v-if="blok.headline">{{ blok.headline }}</Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
      <section class="my-16 flex">
        <aside
          class="invisible hidden flex-shrink-0 flex-col space-y-6 text-dark md:visible md:mr-6 md:flex md:w-[210px] xl:mr-12 xl:w-[240px]"
        >
          <div>
            <label for="search" class="mb-3 block text-lg font-medium">
              Search for a term
            </label>
            <input
              type="search"
              name="search"
              id="search"
              v-model="searchTerm"
              class="rounded-full border border-dark bg-transparent px-4 py-2 focus:outline-none"
              @keypress.enter="fetchProducts()"
            />
          </div>
          <fieldset>
            <legend class="mb-3 text-lg font-medium">Select a category</legend>
            <div v-if="categories" class="flex flex-col space-y-3">
              <label
                v-for="category in categories"
                :key="category.id"
                :for="category.slug"
                class="checkbox flex"
              >
                <input
                  type="checkbox"
                  :id="category.slug"
                  :name="category.slug"
                  :value="category.slug"
                  v-model="checkedCategories"
                  class="invisible hidden"
                />
                <Indicator />
                <span>{{ category.title }}</span>
              </label>
            </div>
          </fieldset>
          <!-- <fieldset>
            <legend class="font-medium text-lg mb-3">It costs more than</legend>
            <div class="flex flex-col space-y-3">
              <label :key="rangePrice" :for="rangePrice" class="checkbox flex">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="100"
                  v-model="rangePrice"
                />

                <span>{{ rangePrice }}</span>
              </label>
            </div>
          </fieldset> -->
          <div>
            <Button :button="button" @click.prevent="resetFilters()">
              Reset filters
            </Button>
          </div>
        </aside>
        <section v-if="products" :class="gridClasses" class="mt-0 md:mt-0">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product-id="product.id"
            :section-bg-color="blok.background_color"
          />
        </section>
        <section v-else class="text-dark">
          Unfortunately, no products matched your criteria.
        </section>
      </section>
    </div>
  </section>
</template>

<style scoped>
.checkbox :deep(div.indicator > svg),
.radio :deep(div.indicator > svg) {
  @apply invisible hidden;
}
.checkbox :deep(input:checked + div.indicator > sv)g,
.radio :deep(input:checked + div.indicator > svg) {
  @apply visible block;
}
</style>
