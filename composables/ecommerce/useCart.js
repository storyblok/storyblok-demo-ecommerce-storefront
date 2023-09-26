export default async function useCart(existingCartId) {
  const { cart, cartId } = await fetchShopifyCheckout(existingCartId)

  return {
    cart,
    cartId,
  }
}
