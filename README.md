# Storyblok Ecommerce Demo

This Frontend website is a practical example of how to integrate Your Frontend with Storyblok content and an e-commerce catalog.
The Frontend website provided in this Open Source repository is built using [Nuxt 3](https://v3.nuxtjs.org/) and [TailwindCSS](https://tailwindcss.com/).
The e-commerce platform used is [Swell](swell.is) but you can adapt the fetching data mechanism with any e-commerce that provides you catalog data via API for retrieving:

- a list of categories;
- one specific category (by slug);
- a list of products related to a category (by slug category);
- a product detail (by slug product);
- filtering products by attributes: category, pricing, name.


## Setup

You can clone locally this repository via `git clone` command, and then you can access the new directory created by the `git clone` command:

```shell
git clone https://github.com/storyblok/storyblok-demo-ecommerce-swell.git
cd storyblok-demo-ecommerce-swell
```

### Install the dependencies

Once you cloned the repository and accessed the project directory you can install the packages needed by the project (using `npm` or `pnpm` or `yarn`):

```bash
npm install
```

### Set your API Keys

Set your API Keys in the `.env` file, for Storyblok and Swell e-commerce. Copy the `.env.example` file into `.env` file and fill all the listed parameters with your values:

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

- Frontend File: `storyblok/ecommerce/ImageTextSectionProduct.vue`;
- Storyblok component: `image-text-section-product`;
- For: product.

Fields:
- `text`: a Richtext field for adding more text;
- `headline`: a plain text field for the title, for example, "New Arrival", "Best product", etc;
- `product` : the plugin field for referencing an e-commerce product;
- `buttons`: call to actions:
    - button internal link to a page;
    - button product, link to a product detail page;
- `reverse_layout`: image on the left or on the right;
- `backgound_color`: back ground color , picked from `eCommerce `Background Colors` data source.

### Banner with selected products

- Frontend File: `storyblok/ecommerce/FeaturedProducts.vue`;
- Storyblok component: `featured-products`;
- For: products.

Product Components useful for showing a list of selected products (best products, selected products for you, etc. )

Fields:
- `headline`: for the editorial purpose (for example, "Latest additions", "Selected products" or "Products of the month");
- `lead`: editorial, for describing the selected products;
- `products`: list of selected products. The products are selected manually by the content editor via the Storyblok UI. The Field plugin retrieves the products directly from the Swell commerce
- `background_color`: pick a color from `eCommerce Background Colors` data source, for the background;
- `cols`: number of columns used for listing products in a kind of grid.


### Banner listing categories

- Frontend File: `storyblok/FeaturedArticlesSection.vue`;
- Stroyblok component: `featured-articles-section`;
- For: articles.

Fields:
- `headline`: title of the block for selected articles (for example, "Important additions", "Our Stories" or "Best articles")
- `lead`: editorial, for describing the selected articles
- `articles`: list of selected articles. The articles are selected manually by the content editor via the Storyblok UI.
- `background_color`: pick a color from `eCommerce Background Colors` data source, for the background;
- `cols`: number of columns used for listing products in a kind of grid.


### Categories listing

- Frontend File: `storyblok/ecommerce/FeaturesCategories.vue`;
- Stroyblok component: `featured-categories`;
- For: products.

Fields:
- `headline`: for the editorial purpose (for example, "By Style")
- `lead`: editorial, for describing the categories
- `background_color`: pick a color from `eCommerce Background Colors` data source, for the background;
- `cols`: number of columns used for listing products in a kind of grid.

## Pages

### Categories

Slug: /product-categories/
Route file: /pages/product-categories/index.vue
Page File: not used (components loaded directly from the route file, because it is a "fixed structure")

With headline, description and cols parameter (for setting the number of columns used to list the categories)
Loads list of categories from Swell ecommerce.
Each category links to the Category page

### Category page

Slug: /product-categories/<SLUG>
Route file: /pages/product-categories/[...slug].vue
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
