const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")
const fs = require("fs")
const Farm = require("./model/farmModel")
const sampleFarm = require("./data/sample_farm_data.json")
dotenv.config({ path: "./.env" })

process.on("uncaughtException", error => {
  console.log("UnhandleRejection Shutting down the application")
  console.log(error.name, error.message)
  process.exit(1)
})


const DB = process.env.DATABASE

mongoose.connect(DB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
}).then((con) => {
  console.log("DB connected successfully")
  console.log(process.env.NODE_ENV)
})


const farms = JSON.parse(fs.readFileSync(`${__dirname}/data/sample_farm_data.json`, "utf-8"))

const importData = async () => {
  try {
    await Farm.create(farms)
    console.log("Data successfully loaded....")
  } catch (error) {
    console.log(error)
  }
}

// importData()

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`You are listening to the port ${port}`)
})

process.on("unhandledRejection", err => {
  console.log("UnhandleRejection Shutting down the application")
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

