const mongoose = require("mongoose")
const User = require("./userModel")


const meatDetailSchema = new mongoose.Schema({
  details: [
    {
      name: {
        type: String,
        required: [true, "Must provide animal name"]
      },
      cuts: {
        type: String,
        required: [true, "Must provide animal cuts"]
      },
      image: {
        type: String,
        default: "IMG"
      },
      weight: {
        type: String,
        required: [true, "Must provide cuts weight"]
      },
      price: {
        type: String,
        required: [true, "Must provide price of meat"]
      }
    }
  ]
})

const produceDetailSchema = new mongoose.Schema({
  details: [
    {
      name: {
        type: String,
        required: [true, "Must provide produce name"]
      },
      image: {
        type: String,
        default: "IMG"
      },
      paksWeight: {
        type: String,
        required: [true, "Must provide the weight of the pack"]
      },
      price: {
        type: String,
        required: [true, "Must provide price of produce"]
      }
    }
  ]
})

const farmSchema = new mongoose.Schema({
  creatorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createAt: {
    type: String,
    required: [true, "Must provide create date"]
  },
  farmName: {
    type: String,
    required: [true, "Must provide unique name"],
    unique: true
  },
  farmImage: {
    type: [String],
    required: [true, "Must provide farm Image"]
  },
  farmLocation: {
    type: String,
    required: [true, "Must provide location"]
  },
  rating: {
    type: Number,
    required: true,
  },
  produce: {
    type: Boolean,
    default: false
  },
  produceDetails: {
    type: produceDetailSchema,
    validate: function() {
      return this.produce
    }
  },
  meat: {
    type: Boolean,
    default: false
  },
  meatDetails: {
    type: meatDetailSchema,
    validate: function() {
      return this.meat
    }
  }
})


const Farm = mongoose.model("Farm", farmSchema)

module.exports = Farm
