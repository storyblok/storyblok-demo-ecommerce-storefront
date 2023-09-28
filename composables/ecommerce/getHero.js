export default async function (
  slug,
  defaultSlug,
  type = 'products',
  apiParams,
) {
  if (defaultSlug == null) {
    defaultSlug = 'default'
  }
  let data = await getEndpoint('cdn/stories/' + type + '/' + slug, apiParams)
  if (!data) {
    data = await getEndpoint(
      'cdn/stories/' + type + '/' + defaultSlug,
      apiParams,
    )
    if (!data) {
      return data.data
    }
  }
  return data.data
}

async function getEndpoint(endpoint, apiParams) {
  const storyblokApi = useStoryblokApi()
  try {
    return await storyblokApi.get(endpoint, apiParams)
  } catch (e) {
    //console.log(e)
    return false
  }
}
