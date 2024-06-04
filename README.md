# Storyblok eCommerce Demo Storefront

This documentation provides a practical example of integrating your frontend with Storyblok content and an eCommerce catalog. The frontend is constructed using [Nuxt 3](https://v3.nuxtjs.org/) and [TailwindCSS](https://tailwindcss.com/). While we use Shopify as the eCommerce platform in this demo, you can adapt the data fetching mechanism to work with any eCommerce platform that provides catalog data via APIs. This integration allows you to retrieve:

- A list of categories.
- A specific category (identified by its slug).
- A list of products related to a category (by the category's slug).
- Details of a specific product (identified by its slug).
- The ability to filter products by attributes such as category, pricing, and name.

## Setup

To get started, clone this repository locally using the `git clone` command and navigate to the newly created directory:

```shell
git clone https://github.com/storyblok/storyblok-demo-ecommerce-storefront.git
cd storyblok-demo-ecommerce-storefront
```

### Install Dependencies

Once you've cloned the repository and accessed the project directory, install the necessary packages using `npm`, `pnpm`, or `yarn`:

```bash
npm install
```

### Set Your API Keys

You need to configure your API Keys in the `.env` file for Storyblok and Shopify. Copy the `.env.example` file to `.env` and populate it with your specific values:

```plaintext
STORYBLOK_TOKEN=your-storyblok-token
SHOPIFY_DOMAIN=your-shopify-domain
SHOPIFY_TOKEN=your-shopify-token
```

### Run the Project

Execute the following command to run the project:

```bash
npm run dev
```

Your project will now be accessible at [https://localhost:3000](https://localhost:3000).

## Features

### Banner with a Single Product

- Frontend File: `storyblok/ecommerce/ImageTextSectionProduct.vue`
- Storyblok component: `image-text-section-product`
- Intended for displaying a single product.

Fields:

- `text`: A rich text field for adding additional text.
- `headline`: A plain text field for the title, such as "New Arrival" or "Best Product."
- `product`: A plugin field for referencing an eCommerce product.
- `buttons`: Call to action buttons, which can link to internal pages or product detail pages.
- `reverse_layout`: Choose whether the image is on the left or right.
- `background_color`: Select a background color from the "eCommerce Background Colors" data source.

### Banner with Selected Products

- Frontend File: `storyblok/ecommerce/FeaturedProducts.vue`
- Storyblok component: `featured-products`
- Designed for displaying a list of selected products, such as best products or personalized recommendations.

Fields:

- `headline`: For editorial purposes (e.g., "Latest Additions," "Selected Products," or "Products of the Month").
- `lead`: Editorial content for describing the selected products.
- `products`: A list of selected products, manually chosen by the content editor via the Storyblok UI. The field plugin retrieves these products directly from the Shopify instance.
- `background_color`: Choose a color from the "eCommerce Background Colors" data source for the background.
- `cols`: Specify the number of columns for listing products in a grid.

### Banner Listing Categories

- Frontend File: `storyblok/FeaturedArticlesSection.vue`
- Storyblok component: `featured-articles-section`
- Designed for listing selected articles, such as "Important Additions," "Our Stories," or "Best Articles."

Fields:

- `headline`: The title of the block for selected articles.
- `lead`: Editorial content for describing the selected articles.
- `articles`: A list of selected articles, chosen manually by the content editor via the Storyblok UI.
- `background_color`: Choose a color from the "eCommerce Background Colors" data source for the background.
- `cols`: Specify the number of columns for listing products in a grid.

### Categories Listing

- Frontend File: `storyblok/ecommerce/FeaturesCategories.vue`
- Storyblok component: `featured-categories`
- Designed for listing product categories, such as "By Style."

Fields:

- `headline`: For editorial purposes (e.g., "By Style").
- `lead`: Editorial content for describing the categories.
- `background_color`: Choose a color from the "eCommerce Background Colors" data source for the background.
- `cols`: Specify the number of columns for listing products in a grid.

## Pages

This section explains important URLs within the project:

- `/product-categories/product-categories/`
- `/product-categories/<slug>`
- `/products/<slug>`

### Categories

- Slug: `/product-categories/product-categories/`
- Route file: `/pages/[...slug].vue`
- Page File: `storyblok/ecommerce/ProductCategoryPageOverview.vue`

This page displays a list of categories along with their headlines, descriptions, and the number of columns used to list the categories. It loads the list of categories from Shopify, and each category links to its respective Category page.

### Category Page

- Slug: `/product-categories/<slug>`
- Route file: `/pages/[...slug].vue`
- Page File: Not used (components loaded directly from the route file due to a fixed structure).

#### Category Page Hero

Each eCommerce category has a specific slug (e.g., `style-2`). The category product slug is used to check for the existence of a story on the frontend. If a story with the category product slug exists, it is loaded to render the product category page. If no such story exists, a default category product page is loaded as a fallback. This approach allows for the creation of both category product HERO pages and standard category product pages.

#### Category Page Standard

The story with the slug `product-categories/default` serves as a template for creating standard category product pages when specific stories are not available. This is useful when you have numerous product categories in your eCommerce catalog, but you lack the editorial resources to create individual stories for each category.

### Product Page

- Slug: `/products/<slug>`
- Route file: `/pages/products/[...slug].vue`
- Page File: Not used (components loaded directly from the route file due to a fixed structure).

#### Product Page Hero

Similar to category pages, each product in the eCommerce catalog has a specific slug (e.g., `watch-001`). The product slug is used to determine whether a corresponding story exists on the frontend. If a story with the product slug exists, it is loaded to render the product page. Otherwise, a default product page is loaded as a fallback. This approach allows for the creation of both product HERO pages and standard product pages.

#### Product Page Standard

The story with the slug `products/default` is the template for creating standard product pages when specific product stories are not available. This is particularly useful when you have numerous products in your eCommerce catalog but lack the editorial resources to create individual stories for each product.

### Store Finder

This editorial page includes a Store component, which is essentially a list of stores (without maps).

- Slug: `/products/<slug>`
- Route file: `/pages/products/[...slug].vue`
- Page File: Not used (components loaded directly from

the route file due to a fixed structure).

## JavaScript Functionality

### Add to Cart

The "Add to Cart" functionality allows users to add selected products to the Shopify Cart. Refer to the functions defined in the [useCart.js file](composables/ecommerce/useCart.js) for more details.

### Composables

The [composable directory](composables/ecommerce/) contains a collection of functions designed to simplify tasks such as accessing and managing the Cart, handling multilanguage support, managing paths, and more.
