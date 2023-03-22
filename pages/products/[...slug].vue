<script setup>
import swell from 'swell-js'
const route = useRoute()

/**
 * Create correct slug and handle language parameter
 */

// Here we are getting the path as a URL parameter

let pathArray = await getPathArray()
let language = await getLanguage(pathArray)
let slug = await getSlug(pathArray, 'watch-001')
if (slug === "default") {
    slug = 'watch-001'
}


console.log(pathArray, language, slug)


/**
 * Fetch current release
 */
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
console.log("SLUG", slug, route)

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
        console.log("ROUTE", route)
        if (slug === 'error-404') error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/products/default', apiParams)
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
    console.log(error)
}



const config = useRuntimeConfig();

let product = {};
swell.init(config.swellStoreName, config.swellAccessToken);
//swell.currency.select('USD');
const { pending, data: ecommerceProduct } = await useLazyAsyncData('ecommerceProduct', function () {
    return swell.products.get(slug)
});

watch(ecommerceProduct, (newEcommerceProduct) => {
    console.log(newEcommerceProduct)
    product = newEcommerceProduct;

})
console.log(await swell.cart.get())

const loadCart = async function () {
    let cart = await swell.cart.get()
    console.log(cart)
    return cart
}
const addToCart = async function (id) {
    console.log(id)
    console.log(swell)
    let cart = await swell.cart.addItem({
        product_id: product.id,
        quantity: 1,
    })
    console.log(cart)
}
</script>

<template>
    <Error404 v-if="error404">
        Unfortunately, this page could not be found.
    </Error404>
    <section v-editable="blok" class="page-section image-text-section bg-black">
        <div class="container   items-center">
            <div v-editable="story.content">
                <Headline v-if="story.content.headline">{{ story.content.headline }}</Headline>
                <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" />
            </div>
            <div>
                <div v-if="pending" class="flex items-center justify-center">
                    <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                </div>
                <div class="items-center justify-center" v-else>
                    <LazyProductCardDetail :product="product" :slug="product.slug" />

                    <div class="flex items-center justify-between">
                        <span class="text-3xl font-bold text-gray-100">{{ product.currency }} {{ product.price }}</span>
                        <a href="#"
                            class="text-white bg-gray-700 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click.prevent="addToCart(product.id)">Add to cart</a>
                    </div>

                </div>

            </div>
        </div>
    </section>
</template>
