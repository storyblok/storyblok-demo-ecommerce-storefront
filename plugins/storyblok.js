import { StoryblokVue, apiPlugin } from '@storyblok/vue'
import { defineNuxtPlugin, useRuntimeConfig, useRoute } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const config = useRuntimeConfig()
  const route = useRoute()

  console.log(route.query)

  vueApp.use(StoryblokVue, {
    ...config.public.storyblok,
    accessToken: route.query.token || config.public.templateToken,
    use: [apiPlugin],
  })
})
