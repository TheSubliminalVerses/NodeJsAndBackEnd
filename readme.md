# Developer Documentation

### Run project in developer mode
```
npm install
npm start
```

## Create demo data
```
npm run seed
```

# API Documentation
## GET /products - Get all product
This method returns all products.

Response 200: Successful

Output array of:
 - id: string
 - brand: string
 - model: string
 - os: string
 - screensize: number
 - image: string (url)


## GET /products/{id} - Get single product
This method returns a single product.

Response 200: Successful
Response 401: Not found

Output array of:
 - id: string
 - brand: string
 - model: string
 - os: string
 - screensize: number
 - image: string (url)

## POST /products - Create new product
Response 201: Successful

Input:
 - brand: string
 - model: string
 - os: string
 - screensize: number
 - image: string (url)

Response 400: Invalid input

## PUT /products/{id} - Update product
Response 200: Successful
Response 401: Not found

Input:
 - brand: string
 - model: string
 - os: string
 - screensize: number
 - image: string (url)

Response 400: Invalid input

## DELETE /products/{id} - Delete product
Response 200: Successful
Response 401: Not found