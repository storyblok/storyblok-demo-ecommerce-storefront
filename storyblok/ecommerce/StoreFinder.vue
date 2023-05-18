<script setup>
defineProps({ blok: Object, uuid: String })

const gridClasses = computed(() => getGridClasses('2'))
</script>

<template>
  <section
    v-editable="blok"
    class="page-section store-finder-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container">
      <Headline class="text-center">{{ blok.headline }}</Headline>
      <Lead class="text-center" v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
      <div v-editable="blok" :class="gridClasses">
        <Store
          v-for="(blok, index) in blok.stores"
          :key="blok._uid"
          :blok="blok"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
