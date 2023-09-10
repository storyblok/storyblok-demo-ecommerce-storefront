<script setup>
const { cart, getCart } = useCart()
await getCart()

const cartOpen = ref(false)
const toggleCart = () => {
  cartOpen.value = !cartOpen.value
}
const closeCart = () => {
  cartOpen.value = false
}
</script>

<template>
  <div class="relative flex h-full items-center">
    <button @click.prevent="toggleCart" class="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="pointer-events-none mx-auto block h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      <span>My Cart ({{ cart.quantity || '0' }})</span>
    </button>
    <Transition v-if="cart">
      <div
        v-show="cartOpen"
        class="absolute right-0 top-1/2 w-[300px] translate-y-8 rounded-lg bg-white px-6 pb-6 pt-12 text-dark shadow-sm"
      >
        <button @click="closeCart()" class="absolute right-2 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div
          class="pointer-events-none absolute right-12 top-0 h-4 w-4 -translate-y-1/2 rotate-45 bg-white"
        ></div>
        <div class="flex flex-col space-y-2">
          <div class="flex flex-row">
            <span class="w-[50px] font-black">Qty</span>
            <span class="w-[calc(100%-125px)] font-black">Product</span>
            <span class="w-[75px] text-right font-black">Price</span>
          </div>
          <div v-for="item in cart.items" :key="item.id" class="flex flex-row">
            <span class="w-[50px]">{{ item.quantity }}</span>
            <span class="w-[calc(100%-125px)]">{{ item.title }}</span>
            <span class="w-[75px] text-right">
              {{ item.price }}
              {{ cart.currency }}
            </span>
          </div>
          <div class="border-t border-dark pt-2 text-right font-black">
            <span v-if="cart.total > 0">
              {{ cart.total }} {{ cart.currency }}
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-all duration-700;
}

.v-enter-from,
.v-leave-to {
  @apply translate-y-12 opacity-0;
}
</style>
