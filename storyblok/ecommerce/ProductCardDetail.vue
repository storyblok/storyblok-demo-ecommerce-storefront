<template>
    <div class=" bg-black flex items-center justify-between">
        <img class="p-8 rounded-t-lg" :src="product.images[0].file.url" :alt="product.name" />
        <div class="px-5 pb-5">
            <h5 class="text-xl font-semibold tracking-tight text-gray-100">{{ product.name }}</h5>
            <div>{{ product.name }}</div>
            <ul>
                <li v-for="benefit in product.content.product_benefits">
                    {{ benefit.text }}
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({ product: Object, slug: String })


const optimizedImage = computed(
    () => props.product?.images[0]?.file.url
)
</script>