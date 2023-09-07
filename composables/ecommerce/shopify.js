import Client from 'shopify-buy'
const config = useRuntimeConfig()

const shopifyClient = Client.buildClient({
  domain: config.public.shopifyDomain,
  storefrontAccessToken: config.public.shopifyToken,
})

export const fetchShopifyProductData = (productID) => {
  if (productID === '' || !productID) return

  const product = reactive({})

  const fetch = async () => {
    shopifyClient.product.fetch(productID).then((fetchedProduct) => {
      console.log(fetchedProduct)
      product.title = fetchedProduct.title
      product.slug = fetchedProduct.handle
      product.image = fetchedProduct.images[0].src
      product.priceCurrency = fetchedProduct.variants[0].price.currencyCode
      product.price = fetchedProduct.variants[0].price.amount
      product.availability = fetchedProduct.variants[0].available
    })
  }

  fetch()

  return product
}

export const fetchShopifyProductsByCategory = async (categoryID) => {
  if (categoryID === '' || !categoryID) return

  const products = reactive([])

  await shopifyClient.collection
    .fetchWithProducts(categoryID, { productsFirst: 10 })
    .then((collection) => {
      collection.products.forEach((product) => {
        products.push({ id: product.id })
      })
    })

  return products
}

export const fetchShopifyAllCollections = async () => {
  const categories = await shopifyClient.collection.fetchAllWithProducts()
  return categories
}
