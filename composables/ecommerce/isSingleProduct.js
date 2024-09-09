export default async function () {
  let slug = await getSlug()

  const language = await getLanguage(slug)
  /**
   * If a specific language is requested, the first part of the slug (the language code) needs to be removed
   */
  if (language) slug = slug.slice(1)
  /**
   * If the slug array is longer than 1
   */
  if (slug.length < 2) return false
  console.log('productSlug: ' + slug)
  // Return false if matches product startpage
  return slug[0] === 'products' && slug[1] !== 'products'
}
