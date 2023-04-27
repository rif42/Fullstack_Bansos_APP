import Express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";

const app = Express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud_rido",
});

app.use(Express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
    console.log(req, "req");
    const user = req.body.user;
    const pass = req.body.pass;
    const id = Math.floor(Math.random(Date.now()) * 1000000);

    const SQLStatement = "INSERT INTO admins (user, pass,id) VALUES (?,?,?)";
    db.query(SQLStatement, [user, pass, id], (err, result) => {
        console.log(result);
        console.log(err);
    });
});

app.post("/login", (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    const SQLStatement = "SELECT * FROM admins WHERE user = ? AND pass = ?";
    db.query(SQLStatement, [user, pass], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Wrong username/password combination!" });
        }
    });
});

app.listen(3001, () => {
    console.log("server running on port 3001");
});
