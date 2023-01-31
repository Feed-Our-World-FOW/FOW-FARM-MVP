const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())


const userRouter = require("./routes/userRouter.js")
const farmRouter = require("./routes/farmRoutes.js")
const AppError = require("./utils/appError.js")
const globalErrorHandler = require("./controllers/errorController.js")

app.use(express.json())

app.use((req, res, next) => {
  console.log("This is from middleware")
  next()
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/farm", farmRouter)

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

// ----------GLOBAL ERROR HANDLE----------
app.use(globalErrorHandler)

module.exports = app
