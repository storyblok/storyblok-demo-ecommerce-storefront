<script setup>
const slug = await getProcessedSlug()
const language = await getLanguage(slug)
const productSlug = await getProductSlug('watch-001')
const releaseId = await getReleaseId()
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
const { customParent } = useRuntimeConfig().public

try {
  try {
    if (slug === 'error-404') error404.value = true
    const { data } = await storyblokApi.get(
      'cdn/stories/products/' + slug,
      apiParams
    )
    story.value = data.story
  } catch (error) {
    if (error.status === 404) error404.value = true
    const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams)
    story.value = data.story
  }

  onMounted(() => {
    useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
      resolveRelations: resolveRelations,
      customParent,
    })
  })
} catch (error) {
  console.log(error)
}
</script>

<template>
  <Error404 v-if="error404">
    Unfortunately, this page could not be found.
  </Error404>
  <SingleProduct
    v-if="story"
    :blok="story.content"
    :product-slug="productSlug"
  />
</template>
