<script setup>
const props = defineProps({ blok: Object })

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

<template>
  <section
    v-editable="blok"
    class="page-section featured-products-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container text-left">
      <Headline
        :color="blok.background_color === 'dark' ? 'white' : 'dark'"
        class="text-left"
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
        <ProductCard
          v-for="product in blok.products.items"
          :key="product.id"
          :productID="product.id"
          :section-bg-color="blok.background_color"
        />
      </div>
    </div>
  </section>
</template>
