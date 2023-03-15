<template>
    <section class="page-section banner-section" :class="[
        { 'no-padding': true },
        { 'pointer-events-none': false },
    ]">
        <div :class="{ container: true }">
            <div class="relative bg-light py-16 px-4 sm:px-6 md:px-8 lg:px-12 lg:py-32 xl:py-40 2xl:py-48 overflow-hidden min-h-[540px] md:min-h-[600px] lg:min-h-[720px] flex items-center justify-center"
                :class="[
                    { 'rounded-lg': false },
                    { 'plus-pattern': false },
                ]">
                <div class="relative z-30">
                    <h2 class="text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight text-center font-black mb-4"
                        :class="[textColor]">
                        {{ category.name }}
                    </h2>
                    <div class="max-w-3xl mx-auto">
                        <h3 class="text-md md:text-lg lg:text-xl text-center font-thin" :class="[textColor]">
                            {{ category.name }}
                        </h3>
                    </div>
                    <div
                        class="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 mt-12 mx-auto">
                        <NuxtLink :to="category.slug" class="block w-full h-full">
                            Buy it
                        </NuxtLink>
                        <NuxtLink :to="category.slug" class="block w-full h-full">
                                See it
                            </NuxtLink>
                    </div>
                </div>
                <img :src="optimizedImage" :alt="category.images[0].file.url && category.meta_title"
                    class="absolute z-0 top-0 left-0 w-full h-full object-cover pointer-events-none" />
            </div>
        </div>
    </section>
</template>

<script setup>
const props = defineProps({ minimal: Boolean, category: Object, slug: String, theme: String })

const textColor = computed(() => {
    return 'text-white'
})

const filters = computed(() => {
    return ''
})

const optimizedImage = computed(
    () => props.category?.images[0]?.file.url
)
</script>
