import Client from 'shopify-buy'
const config = useRuntimeConfig()

const shopifyClient = Client.buildClient({
  domain: config.public.shopifyDomain,
  storefrontAccessToken: config.public.shopifyToken,
})

const cart = ref({})
const cartId = ref(null)

export default function useCart() {
  const assignCheckoutData = (fetchedCheckout) => {
    const checkout = {}
    const items = []
    let itemCount = 0
    fetchedCheckout.lineItems.forEach((item) => {
      itemCount = itemCount + parseInt(item.quantity)
      items.push({
        title: item.title,
        quantity: item.quantity,
        price: Math.floor(item.variant?.priceV2?.amount),
      })
    })
    checkout.quantity = itemCount
    checkout.id = fetchedCheckout.id
    checkout.items = items
    checkout.total = Math.floor(fetchedCheckout.totalPriceV2?.amount)
    checkout.currency = fetchedCheckout.currencyCode
    return checkout
  }

  async function getCart(existingCartId) {
    try {
      if (existingCartId) {
        const fetchedCheckout =
          await shopifyClient.checkout.fetch(existingCartId)
        cartId.value = fetchedCheckout.id
        cart.value = assignCheckoutData(fetchedCheckout)
      } else {
        const fetchedCheckout = await shopifyClient.checkout.create()
        cartId.value = fetchedCheckout.id
        cart.value = assignCheckoutData(fetchedCheckout)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function addToCart(variantId) {
    if (!cartId.value) return
    const itemsToAdd = [{ variantId, quantity: 1 }]
    try {
      const fetchedCheckout = await shopifyClient.checkout.addLineItems(
        cartId.value,
        itemsToAdd,
      )
      cart.value = assignCheckoutData(fetchedCheckout)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    cart: computed(() => cart.value),
    cartId: computed(() => cartId.value),
    addToCart,
    getCart,
  }
}
