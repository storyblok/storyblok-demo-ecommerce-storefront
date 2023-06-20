<script setup>
const cartOpen = ref(false)
const { cart, getCart } = useCart()
await getCart()

const toggleCart = () => {
  cartOpen.value = !cartOpen.value
}

const closeCart = () => {
  cartOpen.value = false
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
        class="absolute top-1/2 right-0 translate-y-8 bg-white w-[300px] rounded-lg px-6 pt-12 pb-6 shadow-sm text-dark"
      >
        <button @click="closeCart()" class="absolute top-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div
          class="absolute right-12 top-0 -translate-y-1/2 w-4 h-4 bg-white rotate-45 pointer-events-none"
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
