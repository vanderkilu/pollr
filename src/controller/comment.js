
import Comment from '../models/comment'
import Reply from '../models/reply'


const getAllCommentForPoll = (req, res) => {
    Comment.find({poll: req.params.poll_id})
            .populate('user')
            .exec((err, comments) => {
                if (err) return res.send(err)
                return res.json(comments)
            })
}

const createComment = (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        user: req.user.id,
        poll: req.params.poll_id
    })
    comment.save((err,newComment)=> {
        if (err) return res.send(err)
        return res.json(newComment)
    })
}

const  getAllReplyForComment = (req, res) => {
    Reply.find({comment: req.body.id})
            .populate('user')
            .exec((err, replies) => {
                if (err) return res.send(err)
                return res.json(replies)
            })
}

const createReply = (req,res) => {
    const reply = new Reply({
        text: req.body.text,
        user: req.user.id,
        comment: req.body.id
    })
    reply.save((err, newReply)=> {
        if (err) return res.send(err)
        return res.json(newReply)
    })
}

export {
    getAllCommentForPoll,
    createComment,
    getAllReplyForComment,
    createReply
}