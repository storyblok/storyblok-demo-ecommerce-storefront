export default async function () {
  const slug = await getSlug()
  if (slug.length < 2) return false
  return slug[0] === 'products' && slug[1] !== 'products'
}
