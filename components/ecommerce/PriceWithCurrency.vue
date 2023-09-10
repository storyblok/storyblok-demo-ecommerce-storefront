<script setup>
const props = defineProps({ price: String, currency: String })
</script>
<template>
  <span class="text-medium">
    {{ props.price + ' ' + props.currency }}
  </span>
</template>
