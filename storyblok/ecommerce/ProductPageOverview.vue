<script setup>
const props = defineProps({ blok: Object });

const gridClasses = computed(() => getGridClasses("4"));

const searchTerm = ref("");
const checkedCategories = ref([]);
const rangePrice = ref(0);

const loadingProducts = ref(true);
const loadingCategories = ref(true);

const products = ref([]);
const categories = ref([]);
import swell from "swell-js";

const resetFilters = async () => {
  searchTerm.value = "";
  checkedCategories.value = [];
  rangePrice.value = 0;
};
const fetchCategories = () => {
  loadingCategories.value = true;
  categories.value = [];
  const config = useRuntimeConfig();

  swell.init(config.public.swellStoreName, config.public.swellAccessToken);

  watchEffect(async () => {
    swell.categories
      .list({
        active: true,
        sort: "name asc",
      })
      .then((result) => {
        categories.value = result.results;
        loadingCategories.value = false;
      });
  });
};

const fetchProducts = () => {
  loadingProducts.value = true;
  products.value = [];
  const config = useRuntimeConfig();

  swell.init(config.public.swellStoreName, config.public.swellAccessToken);

  watchEffect(async () => {
    let filter = {};
    if (checkedCategories.value.length > 0) {
      filter.category = checkedCategories.value;
    }
    let minPrice = 0;
    minPrice = parseInt(rangePrice.value);
    if (minPrice > 0) {
      filter.price = [minPrice, 99999999];
    }
    swell.products
      .list({
        search: searchTerm.value,
        $filters: filter,
      })
      .then((result) => {
        products.value = result.results;
        loadingProducts.value = false;
      });
  });
};

fetchProducts();
fetchCategories();

const button = {
  link: {
    linktype: "url",
  },
  size: "small",
  style: "ghost",
  button_color: "primary",
};
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
                  class="invisible hidden"
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
            <Button :button="button" @click.prevent="resetFilters()">
              Reset filters
            </Button>
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
