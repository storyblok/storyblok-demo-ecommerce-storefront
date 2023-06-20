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
  <div v-if="cart !== null" class="relative flex h-full items-center">
    <button
      @click.prevent="toggleCart"
      class="flex items-center space-x-2 text-white"
    >
      <img
        src="~/assets/images/cart.svg"
        width="20"
        class="pointer-events-none mx-auto block"
        alt="Cart Icon"
      />
      <span>My Cart ({{ cart.item_quantity || '0' }})</span>
    </button>
    <Transition>
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
            <span class="w-[calc(100%-125px)]">{{ item.product.name }}</span>
            <span class="w-[75px] text-right">
              {{ item.price_total }} {{ cart.currency }}
            </span>
          </div>
          <div class="border-t border-dark pt-2 text-right font-black">
            <span>{{ cart.grand_total }} {{ cart.currency }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
  <div v-else>
    <div class="flex items-center space-x-2 text-white">
      <img
        src="~/assets/images/cart.svg"
        width="20"
        class="pointer-events-none mx-auto block"
        alt="Cart Icon"
      />
      <span>My Cart</span>
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
  @apply translate-y-12 opacity-0;
}
</style>
