import Express from "express";
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

app.post("/register", (req, res) => {
    console.log(req, "req");
    const user = req.body.user;
    const pass = req.body.pass;
    const id = Math.floor(Math.random(Date.now()) * 1000000);

    const SQLStatement = "INSERT INTO admins (user, pass,id) VALUES (?,?,?)";
    db.query(SQLStatement, [user, pass, id], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result) {
            if (result.length > 0) {
                res.send(result);
            }
        }
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
        if (result) {
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password combination!" });
            }
        }
    });
});

app.post("/buatbansos", (req, res) => {
    const bansos_id = req.body.bansos_id;
    const nama_bansos = req.body.nama_bansos;
    const tgl1 = req.body.tgl1;
    const tgl2 = req.body.tgl2;
    const sesi = req.body.sesi;
    const SQLStatement = "INSERT INTO bansos (bansos_id, nama_bansos, tgl1, tgl2, sesi) VALUES (?,?,?,?,?)";
    db.query(SQLStatement, [bansos_id, nama_bansos, tgl1, tgl2, sesi], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result) {
            res.send({ message: "Data added!" });
        }
    });
});

app.post("/getbansos", (req, res) => {
    const SQLStatement = "SELECT * FROM bansos";
    db.query(SQLStatement, (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result) {
            res.send(result);
        }
    });
});

app.post("/getbansosbyid", (req, res) => {
    const bansos_id = req.body.bansos_id;
    const SQLStatement = "SELECT * FROM bansos WHERE bansos_id = ?";
    db.query(SQLStatement, [bansos_id], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result) {
            res.send(result);
        }
    });
});

app.post("/getdatawarga", (req, res) => {
    const bansos_id = req.body.bansos_id;
    const SQLStatement = "SELECT * FROM data_warga WHERE bansos_id = ?";
    db.query(SQLStatement, [bansos_id], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result) {
            res.send(result);
        }
    });
});

app.post("/inputdatawarga", (req, res) => {
    const bansos_id = req.body.bansos_id;
    const nkk = req.body.nkk;
    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const SQLStatement = "INSERT INTO data_warga (bansos_id, nkk, nama, alamat) VALUES (?,?,?,?)";
    db.query(SQLStatement, [bansos_id, nkk, nama, alamat], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result) {
            res.send(result);
        }
    });
});

app.post("/confirmstatus", (req, res) => {
    const nkk = req.body.nkk;
    const SQLStatement = "UPDATE data_warga SET status = '1' WHERE nkk = ?";
    db.query(SQLStatement, [nkk], (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result) {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("server running on port 3001");
});
