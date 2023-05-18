export default async function () {
  const slug = await getSlug()
  const productSlug = slug.slice(-1).toString()
  /**
   * Return a default product unless a hero product is viewed.
   */
  return productSlug !== 'default' ? productSlug : 'watch-001'
}
