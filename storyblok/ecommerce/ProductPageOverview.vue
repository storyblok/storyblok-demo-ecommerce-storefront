<script setup>
const props = defineProps({ blok: Object })

const searchTerm = ref('')

const resetFilters = () => {
  searchTerm.value = ''
}

const { collectionSlug } = await useShopifyConfig()
const collectionId = ref(null)
if (collectionSlug) {
  const collection = await fetchShopifyCollectionByHandle(collectionSlug)
  collectionId.value = collection?.id ?? null
}

const products = ref([])
const fetchProducts = async () => {
  try {
    if (searchTerm.value) {
      products.value = await fetchShopifyProductsByCustomQuery(searchTerm.value)
    } else if (collectionId.value) {
      products.value = await fetchShopifyProductsByCategory(collectionId.value)
    } else {
      products.value = await fetchShopifyAllProducts()
    }
  } catch (error) {
    console.log(error)
  }
}

fetchProducts()

watch(searchTerm, () => {
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
