<script setup>
const props = defineProps({ blok: Object })

const gridCardColor = computed(() => {
  return props.blok.background_color === 'light' ? 'bg-white' : 'bg-light'
})

const gridClasses = computed(() => getGridClasses(props.blok.cols))
</script>

<template>
  <section
    v-editable="blok"
    class="page-section grid-section"
    :class="'bg-' + blok.background_color"
  >
    <div class="container text-center">
      <Headline v-if="blok.headline" class="mb-4">{{ blok.headline }}</Headline>
      <Lead v-if="blok.lead">
        {{ blok.lead }}
      </Lead>
      <div :class="[gridClasses, { 'md:!mt-0': !blok.headline && !blok.lead }]">
        <StoryblokComponent
          v-for="card in blok.cards"
          :key="card._uid"
          :card="card"
          :default-color="gridCardColor"
          :blok="card"
        />
      </div>
    </div>
  </section>
</template>
