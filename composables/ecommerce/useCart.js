import swell from 'swell-js'
const cart = ref({})

export default function useCart() {

    async function getCart() {
        const config = useRuntimeConfig()
        swell.init(config.public.swellStoreName, config.public.swellAccessToken)
        cart.value = await swell.cart.get()
    }

    async function addToCart(id) {
        cart.value = await swell.cart.addItem({
            product_id: id,
            quantity: 1,
        })
    }


    return {
        cart: computed(() => cart.value),
        addToCart,
        getCart
    }
}