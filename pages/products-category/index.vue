<script setup>
import swell from 'swell-js'
const route = useRoute()

/**
 * Create correct slug and handle language parameter
 */

// Here we are getting the path as a URL parameter
let slug = []
if (route.query.path) {
    slug = route.query.path?.split('/')
} else {
    // fallback if no path parameter found (e.g. in template space)
    // slug = route.params.slug.slice()
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
    slug = 'home'
}

/**
 * Fetch current release
 */
const releaseId = route.query?._storyblok_release || 0

/**
 * Resolve relations
 */
let resolveRelations = [
    'banner-reference.banners',
    'featured-articles-section.articles',
    'article-page.categories',
    'article-page.author',
]

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
console.log("SLUG", slug)
try {
    try {
        if (slug === 'error-404') error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/products-category/' + slug, apiParams)
        console.log(data)
        story.value = data.story
    } catch (error) {
        if (error.response.status === 404) error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams)
        story.value = data.story
    }

    onMounted(() => {
        if (slug[0] !== undefined && slug[0] === 'site-config') return
        console.log(story.value)
        useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
            resolveRelations: resolveRelations,
        })
    })
} catch (error) {
    console.log(error)
}



const config = useRuntimeConfig();

let categories = [];
swell.init(config.swellStoreName, config.swellAccessToken);
const { pending, data: ecommerceCategories } = await useLazyAsyncData('ecommerceCategoriesFeatured', () =>
    swell.categories.list({
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

const gridClasses = computed(() => {
    let gridClasses =
        'grid md:grid-cols-2 gap-10 md:gap-12 md:mt-12 place-items-center items-start'
    gridClasses += ' lg:grid-cols-3 xl:grid-cols-4'

    return gridClasses
})
</script>

<template>
    <Error404 v-if="error404">
        Unfortunately, this page could not be found.
    </Error404>


    <h1
        class="mt-5 mx-16 p-3 text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-tight lg:leading-tight font-black mb-4">
        {{ story.content.headline }}
    </h1>
    <div :class="gridClasses" class="bg-white">
        <div v-if="pending" class="flex items-center justify-center">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
        <CategoryCard v-else v-for="category in categories" :key="category.id" :category="category" :class="gridCardColor"
            theme="light" />
    </div>
</template>
