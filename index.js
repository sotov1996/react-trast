const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require("path")

dotenv.config({ path: ".env" })

const port = process.env.PORT || 4000
const DB_HOST = process.env.DB_HOST

mongoose.connect("mongodb+srv://trast_app:8scIdjQCb5nhoexd@cluster0.zuy1s.mongodb.net/trast", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use("/api", require("./server/routes/product"))

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

/*mongoose.connect(DB_HOST,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true 
    }
)*/

app.listen(port, () => console.log(`Connect port ${port}`))