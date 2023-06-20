<script setup>
const props = defineProps({ blok: Object })

const gridClasses = computed(() => getGridClasses('4'))

const searchTerm = ref('')
const checkedCategories = ref([])
const rangePrice = ref(0)

const loadingProducts = ref(true)
const loadingCategories = ref(true)

const products = ref([])
const categories = ref([])
import swell from 'swell-js'

const resetFilters = async () => {
  searchTerm.value = ''
  checkedCategories.value = []
  rangePrice.value = 0
}
const fetchCategories = () => {
  loadingCategories.value = true
  categories.value = []
  const config = useRuntimeConfig()

  swell.init(config.public.swellStoreName, config.public.swellAccessToken)

  watchEffect(async () => {
    swell.categories
      .list({
        active: true,
        sort: 'name asc',
      })
      .then((result) => {
        categories.value = result.results
        loadingCategories.value = false
      })
  })
}

const fetchProducts = () => {
  loadingProducts.value = true
  products.value = []
  const config = useRuntimeConfig()

  swell.init(config.public.swellStoreName, config.public.swellAccessToken)

  watchEffect(async () => {
    let filter = {}
    if (checkedCategories.value.length > 0) {
      filter.category = checkedCategories.value
    }
    let minPrice = 0
    minPrice = parseInt(rangePrice.value)
    if (minPrice > 0) {
      filter.price = [minPrice, 99999999]
    }
    swell.products
      .list({
        search: searchTerm.value,
        $filters: filter,
      })
      .then((result) => {
        products.value = result.results
        loadingProducts.value = false
      })
  })
}

fetchProducts()
fetchCategories()

const button1 = {
  link: {
    linktype: 'url',
  },
  size: 'small',
  style: 'default',
  button_color: 'primary',
}

const button2 = {
  link: {
    linktype: 'url',
  },
  size: 'small',
  style: 'ghost',
  button_color: 'primary',
}
</script>

<template>
  <section
    class="page-section product-overview"
    :class="'bg-' + blok.background_color"
    v-editable="blok"
  >
    <div class="container">
      <Headline v-if="blok.headline">{{ blok.headline }} </Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>

      <section class="flex my-16">
        <aside
          class="flex-col space-y-6 md:w-[210px] xl:w-[240px] flex-shrink-0 md:mr-6 xl:mr-12 hidden invisible md:visible md:flex text-dark"
        >
          <div>
            <label for="search" class="block font-medium text-lg mb-3"
              >Search for a term</label
            >
            <input
              type="search"
              name="search"
              id="search"
              v-model="searchTerm"
              class="border border-dark px-4 py-2 rounded-full focus:outline-none bg-transparent"
              @keypress.enter="fetchProducts()"
            />
          </div>
          <fieldset>
            <legend class="font-medium text-lg mb-3">Select a category</legend>
            <div
              v-if="!loadingProducts && categories.length"
              class="flex flex-col space-y-3"
            >
              <label
                v-for="category in categories"
                :key="category.slug"
                :for="category.slug"
                class="checkbox flex"
              >
                <input
                  type="checkbox"
                  :id="category.slug"
                  :name="category.slug"
                  :value="category.slug"
                  v-model="checkedCategories"
                  class="hidden invisible"
                />
                <Indicator />
                <span>{{ category.name }}</span>
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
            <Button
              :button="button1"
              @click.prevent="fetchProducts()"
              class="mt-4"
              >Apply filters</Button
            >
          </div>
          <div>
            <Button :button="button2" @click.prevent="resetFilters()"
              >Reset filters</Button
            >
          </div>
        </aside>
        <section
          v-if="!loadingProducts && products.length"
          :class="gridClasses"
          class="mt-0 md:mt-0"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            :section-bg-color="blok.background_color"
          />
        </section>

        <section
          v-else-if="!loadingProducts && !products.length"
          class="text-dark"
        >
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
