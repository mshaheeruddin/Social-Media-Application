const express = require("express")
const app = express();
const mongoose = require("mongoose")
const helmet = require("helmet")
const morgan = require("morgan")
const dotenv = require("dotenv")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const multer = require("multer")
const path = require("path")
const cors = require('cors')
const cookieParser = require('cookie-parser')


app.use(cors())

dotenv.config();

mongoose.connect(process.env.MONGO_URL, ()=> {
    console.log("Connected to MongoDB")
});

app.use("/images", express.static(path.join(__dirname, "public/images")))
console.log(__dirname)

//Middleware

app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },

})

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req,res) => {
    try {
          return res.status(200).json("File uploaded successfully.")
    } catch(err) {
        console.log(err)
    }
}
)

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute);





app.listen(8800,()=>{
    console.log("Backend server is running!")
})