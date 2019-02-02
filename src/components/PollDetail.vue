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
    </div>
</template>


<script>
    import io from 'socket.io-client'
    import Header from './Header.vue'
    import { getPoll,getAllOptionsForPoll, doVote,updateCount} from '../api'

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
                isUser: false
            }
        },
        mounted() {
            this.socket.on('vote', (data) => {
                this.increment = data.count;
                this.optionToUpdate = data.option;
            })
            this.getData()
        },
        methods: {
             async updateVoteCount() {
                 const data = await updateCount(this.id)
                 return data
            },
            generateTotalVote(instance) {
                return instance.votes.length;
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
            }
        },
        components: {
            appHeader: Header
        }
    }
</script>

<style>
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
</style>
