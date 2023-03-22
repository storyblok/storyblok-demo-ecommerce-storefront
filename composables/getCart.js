import swell from 'swell-js'

export default async function () {
    const config = useRuntimeConfig();
    swell.init(config.swellStoreName, config.swellAccessToken);
    let cart = await swell.cart.get()
    console.log(cart)
    return cart
}