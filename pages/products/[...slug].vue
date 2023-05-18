<template>
    <SingleProduct v-if="story !== null" :blok="story.content" :product-slug="slug" />
    <div v-else>PRODUCT NOT FOUND</div>
</template>

<script setup>
const story = ref(null)
const slug = await getProcessedSlug()
const language = await getLanguage(slug)
const releaseId = await getReleaseId()
const resolveRelations = [
    'banner-reference.banners',
    'featured-articles-section.articles',
    'article-page.categories',
    'article-page.author',
]
const apiParams = {
    version: 'draft',
    language: language,
    fallback_lang: 'default',
    resolve_relations: resolveRelations,
    resolve_links: 'url',
    from_release: releaseId,
}
let data = await getHero(slug, 'default', 'products', apiParams)
if (data) {
    story.value = data.story
}


</script>