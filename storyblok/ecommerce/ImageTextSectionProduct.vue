<template>
    <section v-editable="blok" class="page-section image-text-section" :class="'bg-' + blok.background_color">
        <div class="container grid lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center">
            <div class="order-last text-left" :class="blok.reverse_layout ? '' : 'lg:order-first'">
                <Headline v-if="blok.headline" class="text-white mb-2">{{
                    blok.headline
                }}</Headline>

                <div v-if="!pending && blok.button.length"  class="mt-8">

                    <ButtonProduct v-for="button in blok.button" :key="button._uid" :product="myEcommerceProducts[blok.product.items[0].id]" :button="button" />
                </div>
            </div>
            <div>
                <div v-if="pending" class="flex items-center justify-center">
                    <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                </div>
                <div v-else>

                    <img v-if="!fixedHeightImages" :src="myEcommerceProducts[blok.product.items[0].id].images[0].file.url"
                        :alt="blok.product.items[0].id" class="rounded-lg shadow-2xl pointer-events-none" />
                </div>

                <div v-if="blok.image.filename">
                    <img v-if="!fixedHeightImages" :src="optimizedImage" :alt="blok.image.alt"
                        class="rounded-lg shadow-2xl pointer-events-none" />
                    <img v-if="fixedHeightImages" :src="fixedHeightImages.mobile" :alt="blok.image.alt"
                        class="rounded-lg shadow-2xl pointer-events-none md:hidden md:invisible" />
                    <img v-if="fixedHeightImages" :src="fixedHeightImages.tablet" :alt="blok.image.alt"
                        class="rounded-lg shadow-2xl pointer-events-none hidden invisible md:block md:visible lg:hidden lg:invisible" />
                    <img v-if="fixedHeightImages" :src="fixedHeightImages.desktop" :alt="blok.image.alt"
                        class="rounded-lg shadow-2xl pointer-events-none hidden invisible lg:block lg:visible" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import swell from 'swell-js'

const config = useRuntimeConfig()
const props = defineProps({ blok: Object })

let myEcommerceProducts = [];
swell.init(config.swellStoreName, config.swellAccessToken);
const { pending, data: ecommerceProducts } = await useLazyAsyncData('ecommerceProducts', () =>
    Promise.all(props.blok.product.items.map(product => swell.products.get(product.id)))
);

watch(ecommerceProducts, (newEcommercProducts) => {
    myEcommerceProducts = newEcommercProducts.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
    }, {})
})
const fixedHeightImages = computed(() => {
    if (props.blok.image_layout !== 'fixed-height') return false
    let images = {
        mobile: props.blok.image.filename + '/m/600x300',
        tablet: props.blok.image.filename + '/m/1000x500',
        desktop: props.blok.image.filename + '/m/1000x1250',
    }

    if (props.blok.image.focus) {
        for (const key of Object.keys(images)) {
            images[key] += '/filters:focal(' + props.blok.image.focus + ')'
        }
    }

    return images
})

const optimizedImage = computed(() => props.blok.image.filename + '/m/1000x0')
</script>
