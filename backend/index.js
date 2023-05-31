import express from "express";
import bodyParser from "body-parser";
// import mysql from "mysql";
import mysql from "mysql2"; //Upgarded mysql to mysql2
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Hello123#",
    database:"test"
});

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors())



app.get("/", (req, res) => {
    res.json("Hello this is backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    // return res.json(req.body)
    // return res.json(req.body.title + " " +req.body.desc + " " + req.body.cover)
    // const value = ["title from backend", "desc from backend", "cover pic from backend"];
    const value = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];
    // console.log(req.body);

    db.query(q, [value], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully")
    });

});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully")
    })

})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price`= ?, `cover` = ? WHERE `id` = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [...values,bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been updated successfully")
    })

})

// login and registeration

app.post("/register", (req, res) => {
    const q = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    // return res.json(req.body)
    // return res.json(req.body.title + " " +req.body.desc + " " + req.body.cover)
    // const value = ["title from backend", "desc from backend", "cover pic from backend"];
    const value = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    // console.log(req.body);

    db.query(q, [value], (err, data) => {
        if(err) return res.json(err)
        return res.json("Account has been created successfully")
    });

});

app.post("/login", (req, res) => {
    const q = "SELECT * FROM login WHERE `name` = ? AND `password` = ?";
    // const value = [
    //     req.body.name,
    //     req.body.password
    // ];
    // console.log(req.body);

    db.query(q, [req.body.name,req.body.password], (err, data) => {
        if(err) return res.json(err)
        if(data.length > 0){
            res.send(data)
        }else{
            res.send({message: "Wrong username/password combination"})
        }
        // return res.json("Login has been created successfully")
    });

});

app.listen(8800, () => {
    console.log("Connected to backend");
});