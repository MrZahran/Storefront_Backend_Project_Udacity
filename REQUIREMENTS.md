# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

##### To Get All Users

- Index `/api/users` [GET]

##### To Get User By ID

- Show `/api/users/:id` [GET]

##### To Create New User

- Create Index `/api/users` [POST] [token required]

#### Products

- Index `/api/products`

##### To Get All Products

- Show `/api/products` [GET]

##### To Create New Products

- Create `/api/products/create` [POST] [token required]

#### Orders

- index `/api/orders`

- Current Order by user (args: user id)[token required]
- `/api/orders/:user_id` [GET]

## Database Schema

#### Users Table

- id : number
- email : string
- username : string
- password : string

#### Products Table

- id : number
- title : string
- price : string

#### Orders Table

- id : number
- user_id : number
- status : string

## ProductToOrder Table

- id : number
- order_id : number
- product_id : number
- qty : number
