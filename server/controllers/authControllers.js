const User = require("./../model/userModel")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const catchAsync = require("../utils/catchAsync.js")
const AppError = require("../utils/appError")


// ----------CREATE TOKEN----------
const signToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

// ----------SIGN UP----------
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  const token = signToken(newUser._id)

  res.status(201).json({
    status: "Success",
    token,
    data: {
      user: newUser
    }
  })
})

// ----------LOGIN USER----------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  if(!email || !password) {
    return next(new AppError("Please provide your email & password", 401))
  }
  const user = await User.findOne({ email }).select("+password")
    
  if(!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError("Incorrect email and password", 401))
  }

  const token = signToken(user.id)
  res.status(200).json({
    status: "Success",
    token
  })
})

// ----------PROTECTING DATA----------
exports.protect = catchAsync(async (req, res, next) => {
  let token
  if(
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
  }

  if(!token) {
    return next(new AppError("You are not loged in to get access", 401))
  }
  // validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  
  // user exists
  const freshUser = await User.findById(decoded.id)

  if(!freshUser) {
    return next(new AppError("The user belonging to this token no longer exist", 401))
  }

  // Change Password
  freshUser.changedPasswordAfter(decoded.iat)


  next()
})

