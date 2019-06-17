<template>
    <div class="wrapper-poll">
        <div class="question">
            <h1 class="question__text">{{poll.title}} </h1>
            <div class="question__detail">
                asked by 
                <span class="question__user"> {{poll.user.profile}}</span>
                on
                <span class="question__time">april 2016</span>
            </div>
        </div>
        <div class="options">
            <div class="poll-option"
                                    v-for="(option,i) in options" 
                                    :key="i"
                                    @click="vote(option)"> 
                <p>{{option.value}}</p> 
                <p class="poll-count">{{updateOptionCount(option) }}</p>
            </div>
        </div>

        <div class="comment">
            <h3 class="comment__title">Responses</h3>
            <form class="comment__form" @submit.prevent="createComment">
                <textarea type="text" class="comment__input" v-model="comment"></textarea>
                <button class="btn">publish</button>
            </form>
            <app-comment-container v-for="comment in comments" :key="comment.id" 
            :comment="comment">
             </app-comment-container>
        </div>
        
    </div>
</template>


<script>
    import io from 'socket.io-client'
    import CommentContainer from './CommentContainer.vue'
    import { getPoll,getAllOptionsForPoll, 
    doVote,updateCount, getAllComment, commentCreate } from '../api'

    export default {
        data() {
            return {
                id: this.$route.params.id,
                poll: null,
                pollClass: 'po-',
                options: [],
                increment: 0,
                socket: io('http://localhost:3000'),
                optionToUpdate: '',
                voted: false,
                isUser: false,
                comments: [],
                comment: '',
            }
        },
        mounted() {
            this.socket.on('vote', (data) => {
                this.increment = data.count;
                this.optionToUpdate = data.option;
            })
            this.socket.on('COMMENTED', (data) => {
                this.comments.push(data)
            })
            this.getData()
            this.getComments()
        },
        methods: {
             async updateVoteCount() {
                 const data = await updateCount(this.id)
                 return data
            },
            generateTotalVote(instance) {
                return instance.votes.length;
            },
            async getComments() {
                let comments = await getAllComment(this.id)
                this.comments = comments.data
            },
            async vote(option) {
                if (!this.voted) {
                    let data = await doVote(this.id, option._id)
                    let message = {count: 0, option: data.data.pollOption}
                    let type = data.data.type;
                    if (type === 'increase')  {
                         message.count++ ;
                         this.updateVoteCount()
                    }
                    this.socket.emit('vote', message);
                    this.voted = true;
                }
            },
            updateOptionCount(option) {
                if (this.optionToUpdate === option.value){
                    return this.increment + this.generateTotalVote(option);
                } 
                return this.generateTotalVote(option);
            },
            async getData() {
                let pollData = await getPoll(this.id)
                let optionData = await getAllOptionsForPoll(this.id)
                this.poll = pollData.data
                this.options = optionData.data
                console.log(this.poll)
            },
            async createComment() {
                let comment = await commentCreate(this.id, {text: this.comment})
                this.socket.emit('COMMENT', comment.data)
                this.comment = ''
            }
        },
        components: {
            appCommentContainer: CommentContainer
        }
    }
</script>

<style scoped>
.wrapper-poll {
    margin: 10rem 0;
}
.question {
    color: #673ab7;
    text-align: left;
    margin-bottom: 10rem;
}
.question__detail {
    font-size: 1.5rem;
    color: #bdbdbd;
    margin-top: 1rem;
}
.question__user {
    color:#616161;
}
.question__text {
    font-size: 3rem;
}
.question__vote {
    margin-top: 2rem;
}
.options {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
}

.poll-option {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6rem;
    font-size: 1.7rem;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    background-color: white;
    color: #673ab7;
    font-weight: 600;
}
.poll-count {
    position: absolute;
    top: 1rem;
    left: 1rem;
    color: black;
}

.comment__input {
    width: 100%;
    padding: 1rem 2rem;
    transition: all 0.35s;
    margin-bottom: 2rem;
    border: none;
    border-radius: 3px;
    box-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.1);
    height: 5rem;
    color: #616161;
    font-family: inherit;
}
.comment__input:focus {
    padding: 6rem 4rem;
    outline: none;
}
.comment__form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 4rem;
    width: 60%;
}
.comment {
    margin-top: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.comment__title {
    font-size: 2rem;
    color: #673ab7;
    font-weight: 100;
}
.btn {
    padding: 2rem 4rem;
    border: none;
    border-radius: 5px;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.01);
    background-color: white;
    color: #673ab7;
    font-size: 1.4rem;
    transition: all 0.4s;
    opacity: 1;
    margin-bottom: 5rem;
}
.btn:focus {
    outline: none;
}
.btn:hover {
    cursor: pointer;
}
@media only screen and (max-width : 900px) {  
    .options {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}
</style>
