// entry point for server
const sqlite3 = require("sqlite3").verbose()
const database = require("../module/database")
const express = require("express")
const path = require("path")
const router = express.Router()
const app = express()
const PORT = 8080

const HTTPRequestCodes = {
    success: 200,
    err_not_found: 404,
    redirect: 302
}

let db = new sqlite3.Database("./private/api.db", err => {
    if (err) {
        console.error("Error has occurred!")
        console.log(err)
        return
    }

    console.log("SQLite Database successfully created/connected!")
})

// get method used to initialize the database upon creation, not used in production.
router.get("/apiv1/init", (req, res) => {
    database.prepare(db)
    res.send("Database prepared")
    console.log(`GET ${HTTPRequestCodes.success}: OK`)
})

// router
router.get("/", (req, res) => {
    res.redirect("/apiv1")
    console.log(`GET ${HTTPRequestCodes.redirect}: REDIRECT`)
})

router.get("/apiv1", (req, res) => {
    res.set({"content-type": "text/html"})
    res.sendFile(path.join(__dirname + "/public/homePage.html"), error => {
        if (error) {
            console.error(`GET ${HTTPRequestCodes.err_not_found}: NOT FOUND`)
            res.send("404: NOT FOUND")
            return
        }

        console.log(`GET ${HTTPRequestCodes.success}: OK`)
    })
})

router.get("/apiv1/products", (req, res) => {
    res.set({"content-type": "application/json"})
    database.queryProducts("all", "SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products ORDER BY id", db, res)
    console.log(`Get ${HTTPRequestCodes.success}: OK`)
})

router.get("/apiv1/products/:id", (req, res) => {
    res.set({"content-type": "application/json"})
    database.queryProducts("single", `SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products WHERE id = ${req.params.id}`, db, res)
    console.log(`GET ${HTTPRequestCodes.success}: OK`)
})

app.listen(PORT, function () {
    console.log(`Express app listening on ${PORT}`)
})

app.use("/", router)