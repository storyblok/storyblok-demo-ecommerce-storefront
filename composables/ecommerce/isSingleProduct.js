export default async function () {
  const slug = await getSlug()
  if (!slug[0]) return false
  return slug[0] === 'products'
}
