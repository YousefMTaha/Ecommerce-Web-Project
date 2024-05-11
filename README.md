# MERN Ecommerce

## Description

An ecommerce store built with MERN stack, and utilizes third party API's. This ecommerce store enable three main different flows or implementations:

1. Buyers browse the store categories, products and brands
2. Sellers or Merchants manage their own brand component
3. Admins manage and control the entire store components 


* features:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
 
## Run Locally For BE

Clone the project

```bash
  git clone https://github.com/YousefMTaha/Ecommerce-Web-Project
```

Go to the project directory

```bash
  cd Ecommerce-Web-Project/BE
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Run Locally For FE


Go to the project directory

```bash
  cd Ecommerce-Web-Project/FE
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run Start
```


## BE Features

- User Registration and Authentication: Provide users with the ability to create accounts and log in securely and update his info.
- Product Catalog Management: Ability to add, update and remove products with details like name, description, price, and images.
- Category,Subcategory Catalog Management: Ability to add, update, and remove category , Subcategory with details like name  and images.
- Brand Catalog Management: Ability to add, update, and remove Brands with details like name and images.
- Coupon Catalog Management: Ability to add, update, and remove Coupons with details like code , expire date , no of uses per user(the no of times that allow user to use the copoun ) and the total user (max user can use this copoun).
- Shopping Cart: Allow users to add items to their cart, view the cart, manage the quantity of the product, delete product from cart , and proceed to checkout.
- Checkout Process: Smooth and secure checkout process with various payment options ("Cash" - "Card (Stripe Gateway)").
- Order Management: Ability to view and manage orders, update order status, send order confirmations, and issue refunds (using stripe) if necessary.
- Inventory Management: Track product availability, manage stock levels, and provide alerts for low stock.
- Customer Reviews and Ratings: Enable customers to leave reviews and ratings for products, helping other users make informed purchase decisions.
- Promotions and Discounts: Ability to run promotional campaigns, apply discounts, offer coupons, and track their effectiveness.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_ATLAS='mongodb+srv://tyousef262:pFRnRyJt4BhXXsRA@cluster0.cwz5mhe.mongodb.net/web-project-ecommerce'ّ`

`PORT=3000`

`SALT_ROUND=9`

`TOKEN_SIGNATURE="imposopolTS"`

`MOOD="DEV"`

`BEARER_KEY="yousef_"`

`gmail="tyousef262@gmail.com"`

`gmailPass="mgltqxojgmjtvgoj"`

`cloud_name="ducoqbn7x"`

`api_key="318884386692974"`

`api_secret="FO3iRWv8RWzwabFZ95mdRWBtETA"`

`ENCRYPTION_KEY="imposopolEK"`

`SUCSESSFUL_PAYMENT = '4242424242424242'`

`FAILD_PAYMENT ='4000000000009995'`

`REQUIRED_AUTHENTICATION ="4000002500003155"`

`CANCEL_URL= 'http://localhost:4000/product/search'`

`SUCCESS_URL='http://localhost:3001/E-commerce#/allorders'`

`PAYMENT_SECRET_KEY='sk_test_51NlrAeGR9Ya7i8epSwqhE8bvXjh7kUmpI3qmGi1m7sLhJYddjhrO8aPkgphH5NGFxk6gDs7pkPL47XDZGiGE0aJW004YK9FoM2'`

`ENDPOINT_SECRET ='whsec_bMewvPkLENhPOB59Ix5jq6Vis3TaPNYV'`




## API Documentation

[Postman-Doc](https://documenter.getpostman.com/view/25674968/2sA3JM8hCV)


## DB Schema

[DB-Schema](https://drive.google.com/file/d/1tcNN5gK4y1PgbogETmNPvimCI652Fq3X/view?usp=sharing)



