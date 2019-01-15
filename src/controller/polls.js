import { Router } from 'express';
import Poll from '../models/polls';
import User from '../models/user';
import PollOption from '../models/poll_option'
import Vote from '../models/votes'


export default() => {
    let api = Router();

   api.post('/:user_id/polls', (req, res)=> {
       User.findById(req.params.user_id, (err, user)=> {
           if (err) res.send(err);

           let poll = new Poll();
           poll.title = req.body.title;
           poll.user = user._id;

           poll.save((err)=> {
               if (err) res.send(err);
               user.polls.push(poll);
               user.save((err) => {
                   if (err) res.send(err);
                   let pollOptions = req.body.pollOptions;
                   let newPollOptions = pollOptions.map((pollOption) => {
                        pollOption.poll = poll._id;
                        return pollOption;
                    });
                    PollOption.create(newPollOptions, (err, pos) => {
                        if (err) res.send(err);
                        poll.pollOptions.push(...pos);
                        res.json(poll);
                    });
               });
           });
       });
   });

   api.get('/polls', (req, res) => {
        Poll.find({}).
        populate('user', 'username')
        .exec((err, polls) => {
            if(err) return res.send(err);
            res.json(polls);
        });
   });

   api.get('/:poll_id', (req, res) => {
       Poll.findById(req.params.poll_id, (err, poll) => {
           if (err) res.send(err);
           res.json(poll)
       })
   });

   api.put('/:poll_id', (req, res) => {
        Poll.findById(req.params.poll_id, (err, poll) => {
            if (JSON.stringify(poll.user) === JSON.stringify(req.user.id) ) {
                poll.title = req.body.title;
                poll.save((err) => {
                    if (err) return res.send(err);
                    return res.json(poll);
                });
            }
            else {
                res.send('you cant perform operation');
            }
        });
   });

   api.delete('/:poll_id', (req, res) => {
        Poll.findById(req.params.poll_id, (err, poll) => {
            if (JSON.stringify(poll.user) === JSON.stringify(req.user.id )) {
                poll.remove()
                return res.send('deleted successful')
            }
            else {
                 res.send('you cant perform operation');
            }
        });
   });

   //handlers for the poll options

   api.get('/:poll_id/poll-options/', (req, res)=> {
        PollOption.find({'poll':req.params.poll_id}, (err, pollOptions) => {
            res.json(pollOptions);
        });
    });

    api.put('/:poll_id/poll-options/:poll_option_id', (req, res)=> {
            Poll.findById(req.params.poll_id, (err, poll) => {
                if (JSON.stringify(poll.user) === JSON.stringify(req.user.id) ) {
                    let pollOption = poll.pollOptions.id(req.params.poll_option_id);
                    pollOption.set(req.body);
                    pollOption.save((err) => {
                        if (err) return res.send(err);
                        poll.save(err => {
                            if (err) return res.send(err);
                        })
                    })
            }
            return res.json('can\'t perform such operation');
        })
    });


   //handlers for the vote 
   api.post('/:poll_id/:poll_option_id/votes',(req,res) => {
           Poll.findById(req.params.poll_id, (err, poll) => {
               PollOption.findById(req.params.poll_option_id, (err, pollOption) => {
                Vote.findOne({'poll': poll._id, 'user': req.user.id}, (err, vote)=> {
                    if (vote) {
                        return res.json({type:'reduce', pollOption: pollOption.value});
                    }
                    const newVote = new Vote();
                    newVote.user = req.user.id;
                    newVote.pollOption = pollOption._id,
                    newVote.poll = poll._id
                    newVote.save((err) => {
                        if (err) res.send(err);
                        pollOption.votes.push(newVote);
                        pollOption.save((err)=> {
                            if (err) res.send(err);
                            poll.votes.push(newVote);
                            poll.save((err) => {
                                if (err) return res.send(err);
                                return res.json({type:'increase',pollOption: pollOption.value});
                            })
                        });
                    });
                });  
               });   
           });
   });
    return api;
}