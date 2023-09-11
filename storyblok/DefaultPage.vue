<script setup>
defineProps({ blok: Object, uuid: String })
</script>

<template>
  <div v-editable="blok">
    <Suspense>
      <ComponentCheck
        v-for="(blok, index) in blok.body"
        :key="blok._uid"
        :blok="blok"
        :index="index"
      />
    </Suspense>
  </div>
</template>
