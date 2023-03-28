<script setup>
import swell from 'swell-js'
const route = useRoute()

let pathArray = await getPathArray()
let language = await getLanguage(pathArray)
let slug = await getSlug(pathArray, 'style-1')
if (slug === "default") {
    slug = 'style-1'
}

const releaseId = route.query?._storyblok_release || 0

const resolveRelations = []

const story = ref(null)
const storyblokApi = useStoryblokApi()

const apiParams = {
    version: 'draft',
    language: language,
    fallback_lang: 'default',
    resolve_relations: resolveRelations,
    resolve_links: 'url',
    from_release: releaseId,
}

const error404 = ref(false)


let loadFallback = false
try {
    if (slug === 'error-404') error404.value = true
    const { data } = await storyblokApi.get('cdn/stories' + route.path, apiParams)
    story.value = data.story
} catch (error) {
    loadFallback = true
}
if (loadFallback) {
    try {

        if (slug === 'error-404') error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/products-category/product-category', apiParams)
        story.value = data.story
    } catch (error) {
        if (error.response.status === 404) error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams)
        story.value = data.story
    }

}


try {

    onMounted(() => {
        if (slug[0] !== undefined && slug[0] === 'site-config') return
        useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
            resolveRelations: resolveRelations,
        })
    })
} catch (error) {
    console.error(error)
}



const config = useRuntimeConfig();

let category = {};
swell.init(config.swellStoreName, config.swellAccessToken);
const { pending, data: ecommerceCategory } =  useLazyAsyncData('ecommerceCategory', function () {
    return swell.categories.get(slug)
});

watch(ecommerceCategory, (newEcommerceCategory) => {
    //console.log(newEcommerceCategory)
    category = newEcommerceCategory;
})

let products = {};


const { pendingProducts, data: ecommerceProducts } =  useLazyAsyncData('ecommerceProducts', function () {
    return swell.products.list(
        { category: slug })
});

watch(ecommerceProducts, (newEcommerceProducts) => {
    //console.log(newEcommerceProducts)
    products = newEcommerceProducts;
})


</script>

<template>
    <Error404 v-if="error404">
        Unfortunately, this page could not be found.
    </Error404>
    <div v-editable="story.content">
        <Headline v-if="story.content.headline">{{ story.content.headline }}</Headline>
        <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
    </div>
    <div v-if="pending" class="w-full flex items-center justify-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    </div>
    <CategoryCardDetail v-else :key="category.id"  :category="category" theme="light" />

    <div v-if="pendingProducts" class="w-full flex items-center justify-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    </div>
    <div  v-else class="items-center justify-center">
        <ProductCard v-for="product in products.results" :key="product.id" :product="product"
           />
    </div>
</template>
