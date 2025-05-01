const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortname: {
      type: String,
      trim: true,
      unique: true
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      }
    ],
    active: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);