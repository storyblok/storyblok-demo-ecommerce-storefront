import Client from 'shopify-buy'
const config = useRuntimeConfig()

const shopifyClient = Client.buildClient({
  domain: config.public.shopifyDomain,
  storefrontAccessToken: config.public.shopifyToken,
})

const assignProductData = (fetchedProduct) => {
  const product = {}
  product.id = fetchedProduct.id
  product.slug = fetchedProduct.handle
  product.title = fetchedProduct.title
  product.variantId = fetchedProduct.variants[0]?.id
  product.description = fetchedProduct?.description
  product.image = fetchedProduct?.images[0]?.src
  product.priceCurrency = fetchedProduct?.variants[0]?.price?.currencyCode
  product.price = Math.floor(fetchedProduct?.variants[0]?.price.amount)
  product.availability = fetchedProduct?.variants[0]?.available

  return product
}

const assignCategoryData = (fetchedCollection) => {
  const category = {}
  category.id = fetchedCollection.id
  category.slug = fetchedCollection.handle
  category.title = fetchedCollection.title
  category.description = fetchedCollection?.description
  category.image = fetchedCollection?.image?.src

  return category
}

export const fetchShopifyProductsByCategory = async (categoryID) => {
  if (categoryID === '' || !categoryID) return []

  let products = []

  await shopifyClient.collection
    .fetchWithProducts(categoryID, { productsFirst: 20 })
    .then((fetchedCollection) => {
      fetchedCollection.products.forEach((product) => {
        products.push({ id: product.id })
      })
    })

  return products
}

export const fetchShopifyCollectionByHandle = async (categoryHandle) => {
  if (categoryHandle === '' || !categoryHandle) return

  let category = {}

  await shopifyClient.collection
    .fetchByHandle(categoryHandle)
    .then((fetchedCollection) => {
      Object.assign(category, assignCategoryData(fetchedCollection))
    })

  return category
}

export const fetchShopifyProductByID = async (productID) => {
  if (productID === '' || !productID) return

  let product = {}

  await shopifyClient.product.fetch(productID).then((fetchedProduct) => {
    product = assignProductData(fetchedProduct)
  })

  return product
}

export const fetchShopifyProductByHandle = async (productHandle) => {
  if (productHandle === '' || !productHandle) return

  let product = null

  await shopifyClient.product
    .fetchByHandle(productHandle)
    .then((fetchedProduct) => {
      product = assignProductData(fetchedProduct)
    })

  return product
}

export const fetchShopifyAllProducts = async () => {
  let products = []

  await shopifyClient.product.fetchAll(20).then((fetchedProducts) => {
    fetchedProducts.forEach((fetchedProduct) => {
      products.push({ id: fetchedProduct.id })
    })
  })

  return products
}

export const fetchShopifyProductsByCustomQuery = async (searchTerm) => {
  let products = []

  const query = {
    query: searchTerm ? `title:'${searchTerm}'` : '',
  }

  await shopifyClient.product.fetchQuery(query).then((fetchedProducts) => {
    fetchedProducts.forEach((fetchedProduct) => {
      products.push({ id: fetchedProduct.id })
    })
  })

  return products
}
