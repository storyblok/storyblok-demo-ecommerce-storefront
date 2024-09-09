export default async function () {
  let slug = await getSlug()

  const language = await getLanguage(slug)
  /**
   * If a specific language is requested, the first part of the slug (the language code) needs to be removed
   */
  if (language) slug = slug.slice(1)

  if (slug.length < 2) return false
  // Return false if matches product-categories startpage
  return (
    slug[0] === 'product-categories' &&
    slug[1] !== 'product-categories' &&
    slug[1] !== 'site-config'
  )
}
