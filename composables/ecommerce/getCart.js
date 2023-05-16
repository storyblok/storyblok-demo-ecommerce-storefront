import swell from 'swell-js'

export default async function () {
  const config = useRuntimeConfig()
  swell.init(config.public.swellStoreName, config.public.swellAccessToken)
  const cart = await swell.cart.get()
  return cart
}
