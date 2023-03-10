<template>
    <section v-editable="blok" class="page-section grid-section" :class="'bg-' + blok.background_color">
        <div class="container text-center">
            <Headline color="black" class="text-left" v-if="blok.headline">{{ blok.headline }}</Headline>
            <Lead v-if="blok.lead">
                {{ blok.lead }}
            </Lead>
            <ul>

            </ul>
            <div :class="gridClasses" class="bg-white">
                <div v-if="pending" class="flex items-center justify-center">
                    <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                </div>
                <CategoryCard v-else v-for="category in categories" :key="category.id"
                    :category="category" :class="gridCardColor" minimal="true" theme="light" />
            </div>
        </div>
    </section>
</template>

<script setup>
import swell from 'swell-js'

const config = useRuntimeConfig();
const props = defineProps({ blok: Object })

let categories = [];
swell.init(config.swellStoreName, config.swellAccessToken);
const { pending, data: ecommerceCategories } = await useLazyAsyncData('ecommerceCategoriesFeatured', () =>
    swell.categories.list({
        limit: 4,
        page: 1,
        active: true,
        sort: 'name asc'
    })

);

watch(ecommerceCategories, (newEcommerceCategories) => {
    console.log(newEcommerceCategories)
    categories = newEcommerceCategories.results.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {})
})

const gridCardColor = computed(() => {
    let color = 'bg-light'
    if (props.blok.background_color === 'light') color = 'bg-white'
    return color
})

const gridClasses = computed(() => {
    let gridClasses =
        'grid md:grid-cols-2 gap-10 md:gap-12 md:mt-12 place-items-center items-start'

    switch (props.blok.cols) {
        case '4':
            gridClasses += ' lg:grid-cols-3 xl:grid-cols-4'
            break
        case '3':
            gridClasses += ' lg:grid-cols-3'
            break
    }

    return gridClasses
})
</script>