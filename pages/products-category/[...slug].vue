<script setup>
import swell from 'swell-js'
const route = useRoute()

/**
 * Create correct slug and handle language parameter
 */

// Here we are getting the path as a URL parameter
let slug = []
console.log(route.path)
if (route.query.path) {
    slug = route.query.path?.split('/')
} else {
    // fallback if no path parameter found (e.g. in template space)
    slug = route.params.slug.slice()
}
// In your project you would typically want to do the following:
// let slug = route.params.slug.slice()
let language = 'default'

if (slug) {
    language = await getLanguage(slug)
    // remove first slug entry if it matches query language
    if (language !== 'default') slug = slug.slice(1)
    slug = slug.join('/')
} else {
    slug = 'style-1'
}
if (slug === "product-category") {
    slug = 'style-1'
}

console.log(slug)
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
    console.log(error)
}



const config = useRuntimeConfig();

let category = {};
swell.init(config.swellStoreName, config.swellAccessToken);
const { pending, data: ecommerceCategory } = await useLazyAsyncData('ecommerceCategory', function () {
    return swell.categories.get(slug)
});

watch(ecommerceCategory, (newEcommerceCategory) => {
    console.log(newEcommerceCategory)
    category = newEcommerceCategory;
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
    <div v-if="pending" class="flex items-center justify-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
    </div>
    <CategoryCardDetail v-else :key="category.id" :minimal=true :category="category" theme="light" />
</template>
