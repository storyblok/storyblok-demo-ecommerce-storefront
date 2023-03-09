<script setup>

const props = defineProps({
  contacts: Array,
  headline: String,
  nav: Array
})

const textColor = computed(() => {
  return 'text-white'
})

const backgroundColor = computed(() => {
  return 'bg-dark'
})

const showSeparator = computed(() => props.background_color === 'dark')
</script>

<template>
  <footer class="relative w-full" :class="backgroundColor">
    <div class="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 py-16">
      <div class="sm:col-span-2 md:col-span-3 lg:col-span-2 flex items-center">
        <div>
          <NuxtLink to="/" class="flex mb-8" :class="textColor">
            {{ headline }}
          </NuxtLink>
          <div class="flex items-center">

            <div v-for="contact in contacts" class="p-5">
              <h3 class=" text-l xl:text-l mb-5" :class="textColor">
                {{ contact.label }}
              </h3>
              <div class="text-xs">
                {{ contact.value }}
              </div>

            </div>
          </div>

        </div>
      </div>
      <div class="grid-cols-4 flex">
        <div class="p-1" v-for="item in nav" :key="'footer_nav_' + item._uid">
          <NavItem class="hover:text-primary" :class="light ? 'text-primary' : 'text-white'" :item="item" />
        </div>
      </div>
    </div>
    <div>
      <div v-if="showSeparator" class="h-[1px] w-full bg-gradient-to-r from-dark via-medium to-dark"></div>
      <img src="~/assets/images/made-with-love.svg" width="180" class="block mx-auto py-9 pointer-events-none"
        alt="Made with love by the Storyblok team!" />
    </div>
  </footer>
</template>
