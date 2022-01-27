const sqlite3 = require("sqlite3").verbose()

let db = new sqlite3.Database("./private/api.db", err => {
    db.serialize(function () {
        db.run(`CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT NOT NULL, model TEXT NOT NULL,
        os TEXT NOT NULL, screensize INTEGER DEFAULT 10, image TEXT NOT NULL)`)
    })
})