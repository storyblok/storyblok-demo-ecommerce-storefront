import Client from 'shopify-buy'
const config = useRuntimeConfig()

const shopifyClient = Client.buildClient({
  domain: config.public.shopifyDomain,
  storefrontAccessToken: config.public.shopifyToken,
})

const cart = ref({})
const cartId = ref({})

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
    if (existingCartId) {
      shopifyClient.checkout.fetch(existingCartId).then((fetchedCheckout) => {
        cartId.value = fetchedCheckout.id
        cart.value = assignCheckoutData(fetchedCheckout)
      })
    } else {
      shopifyClient.checkout.create().then((fetchedCheckout) => {
        cartId.value = fetchedCheckout.id
        cart.value = assignCheckoutData(fetchedCheckout)
      })
    }
  }

  async function addToCart(variantId) {
    const itemsToAdd = [
      {
        variantId,
        quantity: 1,
      },
    ]
    shopifyClient.checkout
      .addLineItems(cartId.value, itemsToAdd)
      .then((fetchedCheckout) => {
        cart.value = assignCheckoutData(fetchedCheckout)
      })
  }
  return {
    cart: computed(() => cart.value),
    cartId: computed(() => cartId.value),
    addToCart,
    getCart,
  }
}
