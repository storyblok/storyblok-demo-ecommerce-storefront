<script setup>
const { query } = useRoute()

const inEditor = computed(() => {
  return query._storyblok && window.self !== window.top ? true : false
})

const props = defineProps({ item: Object })

const url = computed(() => {
  switch (props.item.link.linktype) {
    case 'story':
      // here we need to test if the story object exists because it won't be resolved when the bridge is used on site-config
      return '/' + props.item.link.story?.full_slug
    case 'url':
    case 'asset':
      return props.item.link.url
    case 'email':
      return 'mailto:' + props.item.link.email
    default:
      return '#'
  }
})
</script>

<template>
  <NuxtLink
    :to="inEditor ? '' : url"
    class="cursor-pointer transition-colors"
    v-editable="item"
  >
    {{ item.label }}
  </NuxtLink>
</template>
