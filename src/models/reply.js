import mongoose from 'mongoose'

let Schema = mongoose.Schema

const ReplySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    comment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Comment'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Reply', ReplySchema)