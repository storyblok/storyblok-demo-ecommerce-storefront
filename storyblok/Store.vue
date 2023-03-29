<template>

    <div class="w-full max-w-md lg:max-w-none h-full flex flex-col rounded-lg p-6 shadow-sm"
         v-editable="blok">
        <img  :src="optimizedIcon" :alt="blok.name"
            class="mx-auto mb-6 pointer-events-none" />
        <div class="flex flex-col grow">
            <div class="grow" :class="textColor">
                <h3 class="font-medium mb-3 text-xl">
                    {{ blok.name }}
                </h3>

            </div>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({ blok: Object, defaultColor: String })

const optimizedIcon = computed(() => {
    const isSvg = props.blok.picture?.filename.slice(-3) === 'svg'
    const optimize = isSvg ? '' : '/m/800x0'
    return props.blok.picture?.filename + optimize
})

const textColor = computed(() => {
    return 'text-dark'
})
</script>
