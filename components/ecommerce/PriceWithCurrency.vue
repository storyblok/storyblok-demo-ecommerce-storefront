<script setup>
const props = defineProps({ price: String, currency: String })

const currencySymbol = computed(() => {
  switch (props.currency) {
    case 'EUR':
      return '€'
    case 'USD':
      return '$'
  }
})
</script>
<template>
  <span class="text-medium">
    {{ currencySymbol + ' ' + props.price }}
  </span>
</template>
