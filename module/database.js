"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = exports.queryProducts = void 0;
function queryProducts(type, query, db, response) {
    if (type === "all") {
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error("-> Fetch failed: " + err);
                console.error("-> GET 400: BAD REQUEST");
                return;
            }
            console.log("-> Query OK");
            rows.forEach(row => { response.send(row); });
        });
    }
    else if (type === "single") {
        db.get(query, [], (err, row) => {
            if (err) {
                console.error("-> Fetch failed: " + err);
                return;
            }
            console.log("-> Query OK");
            response.send(row);
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
