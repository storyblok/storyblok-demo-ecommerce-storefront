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
Frontend File: `storyblok/ecommerce/ImageTextSectionProduct.vue`
Storyblok component: `image-text-section-product`

Fields:
- `text`: a richtext for adding more text
- `headline`: for exampel for "New Arrival", "Best product", etc
- `product` : ecommerce product
- `buttons`: call to actions
    - button internal link to a page
    - button product, link to a product detail page
- `image`: alternative image
- `image_layout`
- `reverse_layout`: image on the left or on the right
- `backgound_color`

### Banner with selected products

Frontend File: `storyblok/ecommerce/FeaturedProducts.vue`
Stroyblok component: `featured-products`

Fields:
- `headline`: for the editorial purpose (for example, Latest additions, "Selected products" or "Products of the month")
- `lead`: editorial, for describing the selected products
- `Product1`: list of selected products. The products are selected manually by the content editor via the Storyblok UI. The Field plugin retrieves the products directly from the Swell commerce
- Background Color: pick a color from the list for the background
- Cols: number of columns used for listing products in a kind of grid.



### Banner listing categories

Frontend File: `storyblok/FeaturedArticlesSection.vue`
Stroyblok component: `featured-articles-section`

Fields:
- `headline`: for the editorial purpose (for example, Latest additions, "Our Stories" or "Best articles")
- `lead`: editorial, for describing the articles
- `articles`: list of selected articles. The articles are selected manually by the content editor via the Storyblok UI.
- Background Color: pick a color from the list for the background
- Cols: number of columns used for listing articles in a kind of grid.


### Categories listing

Frontend File: `storyblok/ecommerce/FeaturesCategories.vue`
Stroyblok component: `featured-categories`

Fields:
- `headline`: for the editorial purpose (for example, "By Style")
- `lead`: editorial, for describing the categories
- Background Color: pick a color from the list for the background
- Cols: number of columns used for listing categories in a kind of grid.

## Pages

### Categories

Slug: /products-category/
Route file: /pages/products-category/index.vue
Page File: not used (components loaded directly from the route file, because it is a "fixed structure")

With headline, description and cols parameter (for setting the number of columns used to list the categories)
Loads list of categories from Swell ecommerce.
Each category links to the Category page

### Category page

Slug: /products-category/<SLUG>
Route file: /pages/products-category/[...slug].vue
Page File: not used (components loaded directly from the route file, because it is a "fixed structure")

#### Category page HERO

#### Category page STANDARD

### Product page

Slug: /products/<SLUG>
Route file: /pages/products/[...slug].vue
Page File: not used (components loaded directly from the route file, because it is a "fixed structure")

#### Product page HERO

#### Product page STANDARD

### Store Finder

Editorial page with Store component (it is just a list of stores, no maps)

## JS functionality

### Add to cart

Add to the Swell Cart the selected product
See: TBD


### Composables
- getCart
- getLanguage
- getPathArray
- getSlug
