<script setup>
const route = useRoute()
let pathArray = await getPathArray()
let language = await getLanguage(pathArray)
let slug = await getSlug(pathArray, 'store-finder')

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

try {
    try {
        if (slug === 'error-404') error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/' + slug, apiParams)
        story.value = data.story
    } catch (error) {
        if (error.response.status === 404) error404.value = true
        const { data } = await storyblokApi.get('cdn/stories/error-404', apiParams)
        story.value = data.story
    }

    onMounted(() => {
        if (slug[0] !== undefined && slug[0] === 'site-config') return
        useStoryblokBridge(story.value.id, (evStory) => (story.value = evStory), {
            resolveRelations: resolveRelations,
        })
    })
} catch (error) {
    console.log(error)
}



const gridCardColor = computed(() => {
    //return props.blok.background_color === 'light' ? 'bg-white' : 'bg-light'
    return 'bg-light'
})

const gridClasses = computed(() => {
    let gridClasses =
        'grid md:grid-cols-2 gap-10 md:gap-12 place-items-center items-start mt-16'

        gridClasses += ' grid-cols-2'

    return gridClasses
})
</script>

<template>
    <Error404 v-if="error404">
        Unfortunately, this page could not be found.
    </Error404>

    <StoryblokComponent v-if="story" :blok="story.content" :uuid="story.uuid" :index="story.uuid" />
</template>