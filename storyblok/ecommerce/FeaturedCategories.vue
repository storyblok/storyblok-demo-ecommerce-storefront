<script setup>
const props = defineProps({ blok: Object })

const categories = await fetchShopifyAllCollections()

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
        <CategoryCard
          v-if="categories"
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :section-bg-color="blok.background_color"
        />
        <LoadingSpinner v-else />
      </div>
    </div>
  </section>
</template>
