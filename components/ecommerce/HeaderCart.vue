<script setup>
const cartOpen = ref(false)
const { cart, getCart } = useCart()
//let cart = reactive({})
await getCart()

const toggleCart = async () => {
  cartOpen.value = !cartOpen.value
}
</script>

<template>
  <div v-if="cart !== null" class="relative h-full flex items-center">
    <button
      @click.prevent="toggleCart"
      class="flex space-x-2 items-center text-white"
    >
      <img
        src="~/assets/images/cart.svg"
        width="20"
        class="block mx-auto pointer-events-none"
        alt="Cart Icon"
      /><span>My Cart ({{ cart.item_quantity || '0' }})</span>
    </button>
    <Transition>
      <div
        v-show="cartOpen"
        class="absolute top-1/2 right-0 translate-y-8 bg-white w-[300px] rounded-lg p-6 shadow-sm"
      >
        <div
          class="absolute right-6 top-0 -translate-y-1/2 w-4 h-4 bg-white rotate-45 pointer-events-none"
        ></div>
        <div class="flex flex-col space-y-2">
          <div class="flex flex-row">
            <span class="w-[50px] font-black">Qty</span>
            <span class="w-[calc(100%-125px)] font-black">Product</span>
            <span class="w-[75px] font-black text-right">Price</span>
          </div>
          <div v-for="item in cart.items" :key="item.id" class="flex flex-row">
            <span class="w-[50px]">{{ item.quantity }}</span>
            <span class="w-[calc(100%-125px)]">{{ item.product.name }}</span>
            <span class="w-[75px] text-right"
              >{{ item.price_total }} {{ cart.currency }}</span
            >
          </div>
          <div class="border-t border-dark text-right font-black pt-2">
            <span>{{ cart.grand_total }} {{ cart.currency }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <div v-else>
    <div class="flex space-x-2 items-center text-white">
      <img
        src="~/assets/images/cart.svg"
        width="20"
        class="block mx-auto pointer-events-none"
        alt="Cart Icon"
      /><span>My Cart</span>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-all duration-700;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0 translate-y-12;
}
</style>
