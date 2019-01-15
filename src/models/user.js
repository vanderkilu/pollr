import mongoose from 'mongoose';
import Poll from './polls';
import passportLocalMongoose from 'passport-local-mongoose'

let Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: String,
    password: String,
    polls: [Poll.schema],
    votedPolls: [Poll.schema],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);