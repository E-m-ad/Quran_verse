import express from "express";
import axios from "axios";
import morgan from "morgan";
const port = 3000;
const app = express();
const API_URL = "http://api.alquran.cloud/v1/ayah/";
app.use(morgan("dev"));
app.use(express.static("public"));
app.get("/", async (req, res) => {
  const randomAyah = Math.floor(Math.random() * 6236);
  try {
    const response = await axios.get(API_URL + randomAyah);
    const obj = {
      text: response.data.data.text,
      surah: response.data.data.surah.name,
      numberInSurah: response.data.data.numberInSurah,
    };
    res.render("index.ejs", {
      ayah: obj,
    });
  } catch (error) {
    res.render("index.ejs", { ayah: error.message });
  }
});
app.listen(port);
