import mongoose from "mongoose";
import Vote from "./votes";

let Schema = mongoose.Schema;

const PollOptionSchema = new Schema({
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },
  value: String,
  votes: [{ type: Schema.Types.ObjectId }],
});

PollOptionSchema.pre("remove", function (next) {
  Vote.remove({ pollOption: this._id });
  next();
});
module.exports = mongoose.model("PollOption", PollOptionSchema);
