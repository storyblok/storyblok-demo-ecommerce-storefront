import swell from 'swell-js'

export default async function () {
  const config = useRuntimeConfig()
  swell.init(config.public.swellStoreName, config.public.swellAccessToken)
  let cart = await swell.cart.get()
  console.log(cart)
  return cart
}
