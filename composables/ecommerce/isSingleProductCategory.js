export default async function () {
  const slug = await getSlug()
  if (slug.length < 2) return false
  return slug[0] === 'product-categories' && slug[1] !== 'product-categories'
}
