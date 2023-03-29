<template>
    <Headline >{{ blok.title }}</Headline>

    <div v-editable="blok" :class="gridClasses">
        <ComponentCheck v-for="(blok, index) in blok.stores" :key="blok._uid" :blok="blok" :index="index"  />
    </div>
</template>

<script setup>
defineProps({ blok: Object, uuid: String })

const gridClasses = computed(() => {
    let gridClasses =
        'grid md:grid-cols-2 gap-10 md:gap-12 place-items-center items-start mt-16'

    gridClasses += ' grid-cols-2'

    return gridClasses
})
</script>