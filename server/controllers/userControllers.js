const User = require("./../model/userModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

exports.getAllUser = catchAsync(async (req, res) => {
  const user = await User.find()
  res.status(201).json({
    status: "Success",
    result: user.length,
    message: {
      user
    }
  })
})

exports.getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if(!user) {
    return next(new AppError("Can't find any user with this Id", 404))
  }
  res.status(201).json({
    status: "Success",
    result: user.length,
    message: {
      user
    }
  })
})

