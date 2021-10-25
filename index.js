const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

// VARIABLES DE BÚSQUEDA
const url = "http://www.theguardian.com/uk";
const atributo = ".fc-item__title";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const resultados = [];

    $(atributo, html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      resultados.push({
        title,
        url,
      });
    });

    // IMPRIMO RESULTADOS EN CONSOLA
    console.log(resultados);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));
