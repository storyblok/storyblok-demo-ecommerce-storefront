<script setup>
const props = defineProps({ blok: Object })

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

<template>
  <section
    class="page-section product-overview"
    :class="'bg-' + blok.background_color"
    v-editable="blok"
  >
    <div class="container">
      <Headline
        v-if="blok.headline"
        :color="blok.background_color === 'dark' ? 'white' : 'dark'"
        >{{ blok.headline }}</Headline
      >
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
      display products with filters
    </div>
  </section>
</template>
