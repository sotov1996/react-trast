const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
dotenv.config({ path: ".env" })

const port = process.env.PORT || 4000
const DB_HOST = process.env.DB_HOST

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", require("./routes/product"))

mongoose.connect(DB_HOST,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true 
    }
)

app.listen(port, () => console.log("Connect port 4000"))