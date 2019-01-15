import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const VoteSchema = new Schema({
    pollOption: {
        type:Schema.Types.ObjectId,
        ref: 'PollOption',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    poll: {
        type:Schema.Types.ObjectId,
        ref: 'Poll',
        required: true,
    },
});

module.exports = mongoose.model('Vote', VoteSchema);