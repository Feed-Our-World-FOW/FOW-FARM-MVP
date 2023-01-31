module.exports = (myFunc) => {
  return (req, res, next) => {
    myFunc(req, res, next).catch(next)
    // console.log("catch Async is running...")
  }
}