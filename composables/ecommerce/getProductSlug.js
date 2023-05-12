export default async function (defaultProductSlug = '') {
  const slug = await getSlug()
  const productSlug = slug.slice(-1).toString()

  return productSlug !== 'default' ? productSlug : defaultProductSlug
}
