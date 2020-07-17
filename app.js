const express = require("express");
const path = require("path");

const convert = require("./lib/convert");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cotacao", (req, res) => {
  const { cotacao, dolares } = req.query;
  if ((cotacao, dolares)) {
    const conversao = convert.convert(cotacao, dolares);
    res.render("cotacao", {
      error: false,
      cotacao: convert.toMoney(cotacao),
      valor: convert.toMoney(dolares),
      conversao: convert.toMoney(conversao),
    });
  } else {
    res.render("cotacao", {
      error: "Valores invalidos",
    });
  }
});

app.listen(3000, () => {
  console.log("Run port: 3000");
});
