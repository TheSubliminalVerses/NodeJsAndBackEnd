"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function queryProducts(type, query, db, success, error) {
    if (type === "all") {
        db.all(query, [], (err, rows) => {
            if (err) {
                error(error);
                return;
            }
            success(rows);
        });
    }
    else if (type === "single") {
        db.get(query, [], (err, row) => {
            if (err) {
                error(error);
                return;
            }
            if (row === undefined) {
                error('No product found');
                return;
            }
            success(row);
        });
    }
}
exports.queryProducts = queryProducts;
function prepare(db) {
    db.serialize(function () {
        db.run(`CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT NOT NULL, model TEXT NOT NULL,
        os TEXT NOT NULL, screen_size INTEGER DEFAULT 10, image TEXT NOT NULL)`).run(`INSERT INTO products (id, brand, model, os, screen_size, image)
        VALUES (0, 'Apple', 'iPhone 13', 'iOS', 17, 'https://...')`);
    });
}
exports.prepare = prepare;
function setProducts(query, db) {
    db.serialize(function () {
        db.run(query, error => {
            if (error) {
                console.error("-> Query Failed!", error);
                return;
            }
            console.log("-> Query OK");
        });
    });
}
exports.setProducts = setProducts;
function getLastProduct(callback, db) {
    db.get(`SELECT * FROM products ORDER BY id DESC LIMIT 1`, [], (err, row) => {
        if (err) {
            console.error("-> Fetch failed: " + err);
            return;
        }
        callback(row);
    });
}
exports.getLastProduct = getLastProduct;
function getProductById(id, callback, db) {
    db.get(`SELECT ID id, Brand brand, Model model, OS os, Screen_Size screen_size, Image image FROM products WHERE id = ${id}`, [], (err, row) => {
        if (err) {
            console.error("-> Fetch failed: " + err);
            return;
        }
        callback(row);
    });
}
exports.getProductById = getProductById;
