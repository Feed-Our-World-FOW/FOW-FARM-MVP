const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },

})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
