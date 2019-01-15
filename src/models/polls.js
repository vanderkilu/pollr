import mongoose from 'mongoose';
import PollOption from './poll_option';
import Vote from './votes';

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
    votes: [{type:Schema.Types.ObjectId, ref: 'Vote' }]
});

PollSchema.pre('remove', function(next) {
    PollOption.remove({poll: this._id});
    next();
});

module.exports = mongoose.model('Poll', PollSchema);