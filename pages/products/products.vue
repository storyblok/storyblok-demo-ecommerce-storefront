<script setup>
const slug = await getProcessedSlug()
const language = await getLanguage(slug)
const releaseId = await getReleaseId()
const resolveRelations = [
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
const { customParent } = useRuntimeConfig().public

// filters
const searchTerm = ref('')
const checkedCategories = ref([])
const checkedAuthor = ref('')
const loading = ref(true)
const products = ref(null)

const fetchProducts = async () => {
    loading.value = true
    articles.value = null
    const { data } = await storyblokApi.get('cdn/stories/', {
        version: 'draft',
        starts_with: 'articles',
        language: language,
        fallback_lang: 'default',
        search_term: searchTerm.value,
        filter_query: filterQuery.value,
    })
    articles.value = data.stories.filter((story) => story.is_startpage !== true)
    loading.value = false
}

/**
 * Handle products
 */
//const viewingSingleProduct = await isSingleProduct()
//const productSlug = await getSingleProductSlug()

/**
 * Handle product categories
 */
//const viewingSingleProductCategory = await isSingleProductCategory()
//const productCategorySlug = await getSingleProductCategorySlug()

try {
    try {
        if (slug === 'error-404') error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/products/products', apiParams)
        story.value = data.story
    } catch (error) {
        if (error.status === 404) error404.value = true
    }

    onMounted(() => {
        useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
            resolveRelations: resolveRelations,
            customParent,
            preventClicks: true,
        })
        //console.log(this.$route);
    })
} catch (error) {
    console.log(error)
}
</script>

<template>
    <Error404 v-if="error404">
        Unfortunately, this page could not be found.
    </Error404>

<ProductPageOverview :blok="story.content" />
</template>
