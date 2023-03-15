# Storyblok Ecommerce Demo

This Frontend Website is a practical example about how to integrate Your Frontend with Storyblok content and E-commerce catalog.
The FRontend Website provided in this Open Source repository is built using [Nuxt 3](https://v3.nuxtjs.org/) and [TailwindCSS](https://tailwindcss.com/).
The E-commerce platform used is [Swell](swell.is) but you can adapt the fetching data mechanism with any commerece that provides you catalog data via API for retrieving:
- a list of categories
- one specific category (by slug)
- a list of products related to a category (by slug category)
- a product detail (by slug product)


## Setup

### Install the dependencies

```bash
npm install
```

### Set your API Keys

Set your API Keys in the `.env` file, for Storyblok and for Swell e-commerce. Copy the `.env.example` file into `.env` file and fill all the listed parameters with your values:

```
STORYBLOK_SPACE=your-storyblok-space-is
STORYBLOK_PREVIEW_TOKEN=your-storyblok-access-token

SWELL_STORE_NAME=your-swell-ecommerce-name
SWELL_ACCESS_TOKEN=your-swell-access-token

```

### Run the project

```bash
npm run dev
```

Your project will now be served on [https://localhost:3000](https://localhost:3000).


## Features

### Banner with 1 product


### Banner with selected products

Frontend File: `storyblok/ecommerce/FeaturedProducts.vue`
Stroyblok component: `featured-products`

Fields:
- `headline`: for the editorial purpose (for example, Latest additions, "Selected products" or "Products of the month")
- `lead`: editorial, for describing the selected products
- `Product1`: list of selected products. The products are selected manually by the content editor via the Storyblok UI. The Field plugin retrieves the products directly from the Swell commerce
- Background Color: pick a coloro from the list for the background
- Cols: number of columns used for listing products in a kind of grid.



### Banner listing categories


### Categories listing

### Category detail
