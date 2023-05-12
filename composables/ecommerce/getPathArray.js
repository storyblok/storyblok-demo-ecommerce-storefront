export default async function () {
    const route = useRoute()
    let pathArray = []
    if (route.query.path) {
        pathArray = route.query.path?.split('/')
    } else {
        // fallback if no path parameter found (e.g. in template space)
        pathArray = route.params.slug.slice()
    }
    return pathArray
}