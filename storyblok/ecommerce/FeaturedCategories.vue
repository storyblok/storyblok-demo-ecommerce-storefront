<script setup>
const props = defineProps({ blok: Object })

const categories = ref(null)
const pending = ref(true)

try {
  categories.value = await fetchShopifyAllCollections()
  pending.value = false
} catch (error) {
  console.log(error)
  pending.value = false
}

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

<template>
  <section
    v-editable="blok"
    class="page-section featured-categories-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container">
      <Headline
        :color="blok.background_color === 'dark' ? 'white' : 'dark'"
        v-if="blok.headline"
      >
        {{ blok.headline }}
      </Headline>
      <Lead
        v-if="blok.lead"
        :class="blok.background_color === 'dark' ? 'text-white' : 'text-dark'"
      >
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
    </div>
  </section>
</template>
