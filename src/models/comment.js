import mongoose from 'mongoose'
import Reply from './reply'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user:  {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    replies: [Reply.schema],
    created: {
        type: Date,
        default: Date.now()
    },
    poll: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Poll'
    },
    likes: [{type: Schema.Types.ObjectId}]
})
module.exports = mongoose.model('Comment', CommentSchema)