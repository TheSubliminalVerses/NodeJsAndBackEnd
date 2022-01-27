# Assignment 3
- Mani Gudvardarson and Michael Adrian Polesensky
- Web Technology at VU University Amsterdam.
- Coordinator: J.R . van Ossenbruggen
- TA: Mithat Ozgun
- Group: 109
- Date: 26.1.2022
## Developer Documentation
Assignment2 is in the folder that works with the api.
### Initialize database
```
npm run init
```

### Run project in developer mode
```
npm install
npm start
```

### Create demo data
```
npm run seed
```


## API Documentation
### GET /products - Get all product
This method returns all products.

Response 200: Successful

Output array of:
 - id: string
 - brand: string
 - model: string
 - os: string
 - screensize: number
 - image: string (url)


### GET /products/{id} - Get single product
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

### POST /products - Create new product
Response 201: Successful

Input:
 - brand: string
 - model: string
 - os: string
 - screensize: number
 - image: string (url)

Response 400: Invalid input

### PUT /products/{id} - Update product
Response 200: Successful
Response 401: Not found

Input:
 - brand: string
 - model: string
 - os: string
 - screensize: number
 - image: string (url)

Response 400: Invalid input

### DELETE /products/{id} - Delete product
Response 200: Successful
Response 401: Not found