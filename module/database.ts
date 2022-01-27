import {Database} from "sqlite3";
import {Response} from "express";

export function queryProducts(type: string, query: string, db: Database, success: CallableFunction, error: CallableFunction): void {
    if (type === "all") {
        db.all(query, [], (err, rows) => {
            if (err) {
                error(error);
                return
            }

            success(rows)
        })
    } else if (type === "single") {
        db.get(query, [], (err, row) => {
            if (err) {
                error(error);
                return
            }

            if (row === undefined) {
                error('No product found');
                return
            }

            success(row)
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

export function getLastProduct(callback: CallableFunction, db: Database) {
    db.get(`SELECT * FROM products ORDER BY id DESC LIMIT 1`, [], (err, row) => {
        if (err) {
            console.error("-> Fetch failed: " + err)
            return
        }

        callback(row)
    })
}

export function getProductById(id: number, callback: CallableFunction, db: Database) {
    db.get(`SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products WHERE id = ${id}`, [], (err, row) => {
        if (err) {
            console.error("-> Fetch failed: " + err)
            return
        }

        callback(row)
    })
}