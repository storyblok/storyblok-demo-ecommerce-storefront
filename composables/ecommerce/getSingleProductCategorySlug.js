export default async function () {
  const slug = await getSlug()
  const productCategorySlug = slug.slice(-1).toString()
  /**
   * Return a default product category unless a hero product category is viewed.
   */
  return productCategorySlug !== 'default' ? productCategorySlug : 'style-1'
}
