import Client from 'shopify-buy'
const config = useRuntimeConfig()

const shopifyClient = Client.buildClient({
  domain: config.public.shopifyDomain,
  storefrontAccessToken: config.public.shopifyToken,
})

const assignProductData = (fetchedProduct) => {
  const product = {}
  product.id = fetchedProduct.id
  product.title = fetchedProduct.title
  product.description = fetchedProduct.description
  product.slug = fetchedProduct.handle
  product.image = fetchedProduct.images[0].src
  product.priceCurrency = fetchedProduct.variants[0].price.currencyCode
  product.price = fetchedProduct.variants[0].price.amount
  product.availability = fetchedProduct.variants[0].available

  return product
}

export const fetchShopifyProductByID = async (productID) => {
  if (productID === '' || !productID) return

  const product = reactive({})

  await shopifyClient.product.fetch(productID).then((fetchedProduct) => {
    Object.assign(product, assignProductData(fetchedProduct))
  })

  return product
}

export const fetchShopifyProductByHandle = async (productHandle) => {
  if (productHandle === '' || !productHandle) return

  const product = reactive({})

  await shopifyClient.product
    .fetchByHandle(productHandle)
    .then((fetchedProduct) => {
      Object.assign(product, assignProductData(fetchedProduct))
    })

  return product
}

export const fetchShopifyProductsByCategory = async (categoryID) => {
  if (categoryID === '' || !categoryID) return

  const products = reactive([])

  await shopifyClient.collection
    .fetchWithProducts(categoryID, { productsFirst: 10 })
    .then((fetchedCollection) => {
      fetchedCollection.products.forEach((product) => {
        products.push({ id: product.id })
      })
    })

  return products
}

export const fetchShopifyProductsByCustomQuery = async (
  searchTerm,
  categories,
) => {
  const products = reactive([])

  const searchQuery = searchTerm ? `title:'${searchTerm}'` : ''

  let categoriesQuery = ''
  for (let i = 0; i < categories.length; i++) {
    if (i !== 0) categoriesQuery += ' '
    categoriesQuery += `AND tag:'${categories[i]}'`
  }

  let query = {
    query: `${searchQuery} ${categoriesQuery}`,
  }

  await shopifyClient.product.fetchQuery(query).then((fetchedProducts) => {
    fetchedProducts.forEach((fetchedProduct) => {
      products.push({ id: fetchedProduct.id })
    })
  })

  return products
}

export const fetchShopifyAllCollections = async () => {
  const categories = []

  await shopifyClient.collection
    .fetchAllWithProducts()
    .then((fetchedCollections) => {
      fetchedCollections.forEach((fetchedCollection) => {
        categories.push(fetchedCollection)
      })
    })

  return categories
}
