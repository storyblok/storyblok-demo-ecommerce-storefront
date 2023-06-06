<script setup>
const slug = await getProcessedSlug()
const language = await getLanguage(slug)
const releaseId = await getReleaseId()
const story = ref(null)
const storyblokApi = useStoryblokApi()

const apiParams = {
    version: 'draft',
    language: language,
    fallback_lang: 'default',
    resolve_links: 'url',
    from_release: releaseId,
}

const error404 = ref(false)
const { customParent } = useRuntimeConfig().public





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
            customParent,
            preventClicks: true,
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

<ProductPageOverview :blok="story.content" />
</template>
