import {Database} from "sqlite3";
import {Response} from "express";

export function queryProducts(type: string, query: string, db: Database, response: Response): void {
    if (type === "all") {
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("-> Fetch failed: " + err)
                console.error("-> GET 400: BAD REQUEST")
                return
            }

            console.log("-> Query OK")
            response.send(rows)
        })
    } else if (type === "single") {
        db.get(query, [], (err, row) => {
            if (err) {
                console.error("-> Fetch failed: " + err)
                return
            }

            console.log("-> Query OK")
            response.send(row)
        })
    }
}

export function prepare(db: Database): void {
    db.serialize(function () {
        db.run(`CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT NOT NULL, model TEXT NOT NULL,
        os TEXT NOT NULL, screen_size INTEGER DEFAULT 10, image TEXT NOT NULL)`).run(`INSERT INTO products (id, brand, model, os, screen_size, image)
        VALUES (0, 'Apple', 'iPhone 13', 'iOS', 17, 'https://...')`)
    })
}

export function setProducts(query: string, db: Database): void {
    db.serialize(function () {
        db.run(query, error => {
            if (error) {
                console.error("-> Query Failed!", error)
                return
            }

            console.log("-> Query OK")
        })
    })
}