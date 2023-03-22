export default async function (pathArray, defaultSlug) {
    let slug = defaultSlug
    let language = 'default'
    if (pathArray) {
        language = await getLanguage(slug)
        // remove first slug entry if it matches query language
        if (language !== 'default') slug = pathArray.slice(1)
        slug = pathArray.join('/')
    }
    return slug
}