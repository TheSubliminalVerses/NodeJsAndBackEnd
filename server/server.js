// entry point for server
const sqlite3 = require("sqlite3").verbose()
const database = require("../module/database")
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const router = express.Router()
const app = express()
const PORT = 8080
const cors = require('cors')

const HTTPRequestCodes = {
    success: 200,
    bad_request:400,
    err_not_found: 404,
    redirect: 302,
    post_success: 201,
    server_err: 500
}

const API_BASE = 'apiv1'
const PRODUCTS_BASE = 'products'

const PRODUCT_REQUIRED_FIELDS = ['brand', 'model', 'os']

let db = new sqlite3.Database("./private/api.db", err => {
    if (err) {
        console.error("-> Error has occurred!")
        console.error(err)
        return
    }

    console.info("-> SQLite Database successfully created/connected!")
})

let urlParser = bodyParser.json({extended: false})


app.use(cors())
app.use("/", router)
app.use(`/${API_BASE}`, express.static(path.join(__dirname, '../docs')))


// get method used to initialize the database upon creation, not used in production.
router.get(`/${API_BASE}/init`, (req, res) => {
    database.prepare(db)
    res.send("Database prepared")
    console.info(`-> GET ${HTTPRequestCodes.success}: OK`)
})

// router
router.get("/", (req, res) => {
    res.redirect("/apiv1")
    console.info(`-> GET ${HTTPRequestCodes.redirect}: REDIRECT`)
})

router.get(`/${API_BASE}/submit-product`, (req, res) => {
    // res.set({"content-type": "text/html"})
    res.sendFile(path.join(__dirname + "/public/submitNewItem.html"), error => {
        if (error) {
            console.error(`-> GET ${HTTPRequestCodes.err_not_found}: NOT FOUND`)
            res.send("-> 404: NOT FOUND")
            return
        }

        console.info(`-> GET ${HTTPRequestCodes.success}: OK`)
    })
})

// Create a new product
router.post(`/${API_BASE}/${PRODUCTS_BASE}`,  urlParser, (req, res) => {
    res.set({"content-type": "application/json"})
    const missingFields = PRODUCT_REQUIRED_FIELDS.filter(field => !req.body[field])

    if (!req.body || missingFields.length) {
        console.info(`-> POST ${HTTPRequestCodes.bad_request}: BAD REQUEST`)
        res.status(HTTPRequestCodes.bad_request)
        res.send({
            error: "Bad Request",
            message: `Missing required fields ${missingFields.join(', ')}`
        })
    } else {
        console.info('body', req.body)
        database.setProducts(`INSERT INTO products (brand, model, os, screen_size, image)
        VALUES ('${req.body.brand}', '${req.body.model}', '${req.body.os}', ${req.body.screenSize || null}, '${req.body.image || null}')`, db)

        database.getLastProduct((row) => {
            res.send(row)
        }, db)
    }
})

// Update a single product
router.put(`/${API_BASE}/${PRODUCTS_BASE}/:id`,  urlParser, async (req, res) => {
    // res.set({"content-type": "application/json"})

    database.queryProducts(
        "single",
        `SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products WHERE id = ${req.params.id}`, 
        db,
        (row) => {
            const keys = Object.keys(req.body)
            const missingValues = keys.filter(field => PRODUCT_REQUIRED_FIELDS.includes(field) && !req.body[field])

            if (!req.body || missingValues.length) {
                console.info(`-> POST ${HTTPRequestCodes.bad_request}: BAD REQUEST`)
                res.status(HTTPRequestCodes.bad_request)
                res.send({
                    error: "Bad Request",
                    message: `Missing values for required fields ${missingFields.join(', ')}`
                })
            } else {
                const updateString = Object.keys(req.body).map(value => `${value} = '${req.body[value]}'`).join(', ')
                database.setProducts(`UPDATE products SET ${updateString} WHERE id = ${req.params.id}`, db)

                res.send(Object.assign(row, req.body))
            }
        },
        () => {
            console.info(`-> POST ${HTTPRequestCodes.err_not_found}: NOT FOUND`)
            res.status(HTTPRequestCodes.err_not_found).send({
                error: "Item not found",
            })
        }
    )
})

// Delete a single product
router.delete(`/${API_BASE}/${PRODUCTS_BASE}/:id`,  urlParser, async (req, res) => {
    res.set({"content-type": "application/json"})

    database.queryProducts(
        "single",
        `SELECT id FROM products WHERE id = ${req.params.id}`, 
        db,
        (row) => {
            database.setProducts(`DELETE FROM products WHERE id = ${req.params.id}`, db)

            res.send({
                message: "Item has been deleted",
            })
        },
        () => {
            console.info(`-> POST ${HTTPRequestCodes.err_not_found}: BAD REQUEST`)
            res.status(HTTPRequestCodes.err_not_found).send({
                error: "Item not found",
            })
        }
    )
})

// Get all products
router.get(`/${API_BASE}/${PRODUCTS_BASE}`, (req, res) => {
    res.set({"content-type": "application/json"})
    database.queryProducts(
        "all",
        "SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products ORDER BY id", 
        db,
        (result) => {
            res.send(result)
        },
        (error) => {
            res.status(HTTPRequestCodes.bad_request)
            res.send({
                error: "Bad Request",
            })
        }
    )
})

// Get a single product
router.get(`/${API_BASE}/${PRODUCTS_BASE}/:id`, (req, res) => {
    res.set({"content-type": "application/json"})
    database.queryProducts(
        "single",
        `SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products WHERE id = ${req.params.id}`, 
        db,
        (result) => {
            res.send(result)
        },
        (error) => {
            res.status(HTTPRequestCodes.err_not_found)
            res.send({
                error: "Item not found",
            })
        }
    )
    console.info(`-> GET ${HTTPRequestCodes.success}: OK`)
})

// Start the server
app.listen(PORT, function () {
    let date = new Date()
    console.info(`-> Server started successfully at ${date.getDate()}-${date.getMonth() + 1}-${date.getUTCFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.`)
    console.info(`-> Express app listening on ${PORT}.`)
})