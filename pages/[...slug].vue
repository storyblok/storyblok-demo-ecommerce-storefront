<script setup>
const slug = await getSlug()
const processedSlug = await getProcessedSlug()
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
  version: getVersion(),
  language: language,
  fallback_lang: 'default',
  resolve_relations: resolveRelations,
  resolve_links: 'url',
  from_release: releaseId,
}

const error404 = ref(false)
const { customParent } = useRuntimeConfig().public

/**
 * Handle products
 */
const viewingSingleProduct = await isSingleProduct()
const productSlug = await getSingleProductSlug()

/**
 * Handle product categories
 */
const viewingSingleProductCategory = await isSingleProductCategory()
const productCategorySlug = await getSingleProductCategorySlug()

try {
  try {
    if (processedSlug === 'error-404') error404.value = true
    let data = null
    if (viewingSingleProductCategory) {
      data = await getHero(
        productCategorySlug,
        'default',
        'product-categories',
        apiParams,
      )
    } else if (viewingSingleProduct) {
      data = await getHero(productSlug, 'default', 'products', apiParams)
    } else {
      data = await getStory(processedSlug, apiParams)
    }
    if (data) {
      story.value = data.story
    }
  } catch (error) {
    if (error.status === 404) error404.value = true
    const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams)
    story.value = data.story
  }

  onMounted(() => {
    useStoryblokBridge(story.value?.id, (evStory) => (story.value = evStory), {
      resolveRelations: resolveRelations,
      customParent,
      preventClicks: false,
    })
  })
} catch (error) {
  console.log(error)
}

const enableBreadcrumbs = useState('enableBreadcrumbs')
const breadcrumbsExcludedStories = useState('breadcrumbsExcludedStories')
const enableBreadcrumbsForStory = computed(() => {
  if (processedSlug.startsWith('site-config')) return false
  if (error404.value === true) return false
  if (!enableBreadcrumbs.value) return false
  const found = breadcrumbsExcludedStories.value.find(
    (storyUuid) => storyUuid === story.value.uuid,
  )
  if (!found) return true
})
const breadCrumbsAltStyle = computed(
  () => processedSlug.startsWith('articles/') && processedSlug.length > 9,
)
</script>

<template>
  <Error404 v-if="error404">
    Unfortunately, this page could not be found.
  </Error404>
  <Breadcrumbs
    v-if="enableBreadcrumbsForStory"
    :slug="processedSlug"
    :alt-style="breadCrumbsAltStyle"
  />
  <StoryblokComponent
    v-if="story && !viewingSingleProduct && !viewingSingleProductCategory"
    :blok="story.content"
    :uuid="story.uuid"
    :index="story.uuid"
  />
  <SingleProduct
    v-else-if="story && viewingSingleProduct"
    :blok="story.content"
    :product-slug="productSlug"
  />
  <SingleProductCategory
    v-else-if="story && viewingSingleProductCategory"
    :blok="story.content"
    :product-category-slug="productCategorySlug"
  />
</template>
