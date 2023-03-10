<template>
    <NuxtLink :to=category.slug v-if="category"
        class="max-w-md flex flex-col h-full rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg group">
        <div class="w-full h-[210px] xl:h-[300px] overflow-hidden">
            <img :src="optimizedImage" :alt="category.images[0].file.url && category.meta_title"
                class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 transform pointer-events-none" />
        </div>
        <div :class="[backgroundColor, foregroundColor]" class="grow p-6 text-left flex justify-between">
            <h3 :class="[backgroundColor, foregroundColor]" class="font-medium mb-3 text-xl uppercase font-light tracking-widest">
                {{ category.name }}
            </h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>

            <div v-if="minimal == 'true'" :class="foregroundColor" class="line-clamp-3 font-light leading-relaxed">
                {{ category.name }}
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({ category: Object, slug: String, theme: String })

const backgroundColor = computed(() => {
    let color = 'bg-black'
    if (props.theme === 'light') color = 'bg-white'
    return color
})
const foregroundColor = computed(() => {
    let color = 'text-white'
    if (props.theme === 'light') color = 'text-black'
    return color
})

const optimizedImage = computed(
    () => props.category?.images[0]?.file.url
)
</script>
