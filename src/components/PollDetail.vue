<template>
    <div class="wrapper-poll">
        <h5 class="question">
            {{poll.title}}
        </h5>
        <div class="options">
            <div class="poll-option" :class="pollClass+i" 
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
                <p class="comment__user"><span class="emoji"> 😉 </span> kweku kilu</p>
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
                socket: io('http://localhost:30016/'),
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
                console.log(this.comments)
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
                console.log(this.comments)
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
    background-color: #ede7f6;
    color: #673ab7;
    font-size: 1.6rem;
    padding: 6rem 4rem;
    text-align: center;
    margin-bottom: 10rem;
}
.options {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
}
.po-0 {
    background-color: #ede7f6;
    color: #673ab7;
}
.po-1 {
    background-color: #fce4ec;
    color: #d81b60;
}
.po-2 {
    background-color: #e3f2fd;
    color: #1565c0;
}
.po-3 {
    background-color: #f9fbe7;
    color: #afb42b;
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
    margin-top: 10rem;
    width: 60%;
}
.comment {
    margin-top: 15rem;
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
.comment__user {
    transform: translateY(-8rem) translateX(-12rem);
    opacity: 0;
    transition: all 0.5s;
    color: #673ab7;
    font-size: 1.4rem;
}
.comment__input:focus ~ .comment__user {
    transform: translateY(-22rem) translateX(-20rem);
    opacity: 1;
}
.btn {
    padding: 2rem 4rem;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.01);
    background-color: #ede7f6;
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
