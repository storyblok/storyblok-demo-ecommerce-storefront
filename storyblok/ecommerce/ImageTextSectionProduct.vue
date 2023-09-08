<script setup>
const props = defineProps({ blok: Object })

const product = ref(null)

watchEffect(async () => {
  product.value =
    props.blok?.product?.items[0]?.id &&
    (await fetchShopifyProductByID(props.blok?.product?.items[0]?.id))
})

const button = {
  size: 'default',
  style: 'ghost',
  button_color: 'white',
}
</script>

<template>
  <section
    v-editable="blok"
    class="page-section image-text-section-product"
    :class="'bg-' + blok.background_color"
  >
    <div
      class="container grid items-center gap-6 sm:gap-10 md:gap-12 lg:grid-cols-2"
    >
      <div
        class="order-last text-left"
        :class="blok.reverse_layout ? '' : 'lg:order-first'"
      >
        <Headline
          :color="blok.background_color === 'dark' ? 'white' : 'dark'"
          class="text-left"
          v-if="blok.headline"
        >
          {{ blok.headline }}
        </Headline>
        <RichText
          :text="blok.text"
          :class="{ 'prose-invert': blok.background_color === 'dark' }"
        />
        <Button
          :button="button"
          :link="`products/${product.slug}`"
          v-if="product"
          class="mt-8"
        >
          Shop now
        </Button>
      </div>
      <div>
        <img
          v-if="product"
          :src="product.image"
          :alt="product.title"
          class="pointer-events-none aspect-square w-full max-w-md rounded-lg object-cover shadow-2xl lg:aspect-auto lg:max-w-full"
        />
        <LoadingSpinner v-else />
      </div>
    </div>
  </section>
</template>
