// entry point for server
const sqlite3 = require("sqlite3").verbose()
const database = require("../module/database")
const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const router = express.Router()
const app = express()
const PORT = 8080

const HTTPRequestCodes = {
    success: 200,
    err_not_found: 404,
    redirect: 302,
    post_success: 201,
    server_err: 500
}

let db = new sqlite3.Database("./private/api.db", err => {
    if (err) {
        console.error("-> Error has occurred!")
        console.log(err)
        return
    }

    console.log("-> SQLite Database successfully created/connected!")
})

let urlParser = bodyParser.urlencoded({extended: false})

app.use("/", router)
app.use("/static", express.static(__dirname + "/public"))

// get method used to initialize the database upon creation, not used in production.
router.get("/apiv1/init", (req, res) => {
    database.prepare(db)
    res.send("Database prepared")
    console.log(`-> GET ${HTTPRequestCodes.success}: OK`)
})

// router
router.get("/", (req, res) => {
    res.redirect("/apiv1")
    console.log(`-> GET ${HTTPRequestCodes.redirect}: REDIRECT`)
})

router.get("/apiv1/submit-product", (req, res) => {
    // res.set({"content-type": "text/html"})
    res.sendFile(path.join(__dirname + "/public/submitNewItem.html"), error => {
        if (error) {
            console.error(`-> GET ${HTTPRequestCodes.err_not_found}: NOT FOUND`)
            res.send("-> 404: NOT FOUND")
            return
        }

        console.log(`-> GET ${HTTPRequestCodes.success}: OK`)
    })
})

router.post("/apiv1/submit",  urlParser, (req, res) => {
    if (!req.body) {
        console.log(`-> POST ${HTTPRequestCodes.server_err}: SERVER ERROR`)
    } else {
        database.setProducts(`INSERT INTO products (id, brand, model, os, screen_size, image)
        VALUES (${parseInt(req.body._id)}, '${req.body._brand}', '${req.body._model}', '${req.body._os}', ${parseInt(req.body._screenSize)}, '${req.body._image}')`, db)

        console.log(`-> POST ${HTTPRequestCodes.post_success}: OK`)
    }
    res.end("true")
})

router.get("/apiv1", (req, res) => {
    // res.set({"content-type": "text/html"})
    res.sendFile(path.join(__dirname + "/public/homePage.html"), error => {
        if (error) {
            console.error(`-> GET ${HTTPRequestCodes.err_not_found}: NOT FOUND`)
            res.send("-> 404: NOT FOUND")
            return
        }

        console.log(`-> GET ${HTTPRequestCodes.success}: OK`)
    })
})

router.get("/apiv1/products", (req, res) => {
    // res.set({"content-type": "application/json"})
    database.queryProducts("all", "SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products ORDER BY id", db, res)
    console.log(`-> Get ${HTTPRequestCodes.success}: OK`)
})

router.get("/apiv1/products/:id", (req, res) => {
    // res.set({"content-type": "application/json"})
    database.queryProducts("single", `SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products WHERE id = ${req.params.id}`, db, res)
    console.log(`-> GET ${HTTPRequestCodes.success}: OK`)
})

app.listen(PORT, function () {
    let date = new Date()
    console.log(`-> Server started successfully at ${date.getDate()}-${date.getMonth() + 1}-${date.getUTCFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.`)
    console.log(`-> Express app listening on ${PORT}.`)
})