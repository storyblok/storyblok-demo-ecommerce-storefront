const cart = ref({})

export default function useCart() {
  async function getCart() {
    if (!cart.value.id) {
      console.log('notcreated')
      cart.value = await createShopifyCheckout()
      console.log(await createShopifyCheckout())
    } else {
      console.log('already created')
      cart.value = await fetchShopifyCheckout(cart.value.id)
    }
  }

  async function addToCart(variantId) {
    const itemsToAdd = [
      {
        variantId,
        quantity: 1,
      },
    ]
    cart.value = await addToShopifyCheckout(cart.value.id, itemsToAdd)
  }

  return {
    cart: computed(() => cart.value),
    addToCart,
    getCart,
  }
}
