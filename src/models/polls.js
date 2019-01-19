import mongoose from 'mongoose';
import PollOption from './poll_option';

let Schema = mongoose.Schema;

const PollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    pollOptions: [PollOption.schema],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

PollSchema.pre('remove', function(next) {
    PollOption.remove({poll: this._id});
    next();
});

module.exports = mongoose.model('Poll', PollSchema);