export const useShopifyConfig = async () => {
  const storyblokApi = useStoryblokApi()
  const { data } = await storyblokApi.get('cdn/datasource_entries', {
    datasource: 'shopify-config',
  })
  return {
    collectionSlug:
      data.datasource_entries.find((e) => e.name === 'collection_slug')
        ?.value ?? null,
  }
}
