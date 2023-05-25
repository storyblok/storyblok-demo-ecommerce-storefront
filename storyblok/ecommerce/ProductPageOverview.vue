<script setup>
const props = defineProps({ blok: Object })

const gridClasses = computed(() => getGridClasses(props.blok.cols))

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
    swell.categories.list({
      active: true,
      sort: 'name asc',
    }).then((result) => {
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
    if (rangePrice.value > 0) {
      filter.price = [rangePrice.value, 99999999]
    }
    swell.products.list({
      search: searchTerm.value,
      $filters: filter
    }).then((result) => {
      products.value = result.results
      loadingProducts.value = false
    })
  })
}

fetchProducts()
fetchCategories()
</script>

<template>
  <section class="page-section product-overview" :class="'bg-' + blok.background_color" v-editable="blok">
    <div class="container">
      <Headline v-if="blok.headline" :color="blok.background_color === 'dark' ? 'white' : 'dark'">{{ blok.headline }}
      </Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>

      <section class="flex my-16">
        <section
          class="flex-col space-y-6 md:w-[210px] xl:w-[240px] flex-shrink-0 md:mr-6 xl:mr-12 hidden invisible md:visible md:flex">
          <div>
            <label for="search" class="block font-medium text-lg mb-3">Search for a term</label>
            <input type="search" name="search" id="search" v-model="searchTerm"
              class="border border-medium px-4 py-2 rounded-full focus:outline-none" @keypress.enter="fetchProducts()" />
          </div>
          <fieldset>
            <legend class="font-medium text-lg mb-3">Select a category</legend>
            <div v-if="!loadingProducts && categories.length" class="flex flex-col space-y-3">
              <label v-for="category in categories" :key="category.slug" :for="category.slug" class="checkbox flex">

                <input type="checkbox" :id="category.slug" :name="category.slug" :value="category.slug"
                  v-model="checkedCategories" class="" />

                <span>{{ category.name }}</span>
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend class="font-medium text-lg mb-3">It costs more than</legend>
            <div class="flex flex-col space-y-3">
              <label :key="rangeprice" :for="rangeprice" class="checkbox flex">
                <input type="range" min="0" max="1000" step="100" v-model="rangePrice" />


                <span>{{ rangePrice }}</span>
              </label>
            </div>
          </fieldset>


          <div>
            <button @click.prevent="fetchProducts()" class="mt-4">Apply filters</button>
          </div>
          <div>
            <button :button="button2" @click.prevent="resetFilters()">Reset filters</button>
          </div>
        </section>
        <section v-if="!loadingProducts && products.length" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-12">

          <ProductCard v-for="product in products" :product="product" sectionBgColor="white" />
        </section>
        <section v-else-if="!loadingProducts && !products.length">
          Unfortunately, no products matched your criteria.
        </section>
      </section>

    </div>
  </section>
</template>
