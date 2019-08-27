const express = require("express");
const app = express();

const routes = require("./routes")

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
} else {
    app.use(express.static("client/public"));
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next()
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes)

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on PORT:", PORT)
    })
});