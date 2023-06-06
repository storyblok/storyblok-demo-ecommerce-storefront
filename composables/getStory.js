export default async function (slug, apiParams) {
    let data = await getEndpoint('cdn/stories/' + slug , apiParams)
    return data.data
}

async function getEndpoint(endpoint, apiParams) {
    const storyblokApi = useStoryblokApi()
    try {
        return await storyblokApi.get(endpoint, apiParams)
    } catch (e) {
        console.log(e)
        return false
    }
}