import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    //await dbRun("DROP TABLE IF EXISTS users")
    await dbRun("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER)");


    const products = [
        { name: "alma", price: 600 },
        { name: "Best Seller könyv", price: 4300 },
        { name: "maszk", price: 1000 },
    ];

    for (const product of products) {
        await dbRun("INSERT INTO products (name, price) VALUES (?, ?)", [product.name, product.price]);
    }
};

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };
