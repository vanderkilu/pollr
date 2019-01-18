<template>
    <div class="wrapper-poll">
        <h5 class="question">
            dog or cat or mule or rabbit ?
        </h5>
        <div class="options">
            <div class="poll-option" :class="pollClass+i" v-for="(option,i) in options" :key="i"> 
                <p>{{option.value}}</p> 
                <p class="poll-count">{{option.count}}</p>
            </div>
        </div>
    </div>
</template>


<script>
    import io from 'socket.io-client'
    import {mapGetters} from 'vuex'
    import Header from './Header.vue'

    export default {
        data() {
            return {
                id: '',
                poll: null,
                pollClass: 'po-',
                options: [
                    {
                        value: 'cat',
                        count: 10
                    },
                     {
                        value: 'dog',
                        count: 50
                    },
                    {
                        value: 'mule',
                        count: 19
                    },
                    {
                        value: 'rabbit',
                        count: 70
                    },
                ],
                increment: 0,
                socket: io('http://localhost:30002/'),
                optionToUpdate: '',
                voted: false,
                isUser: false
            }
        },
        computed: {
            ...mapGetters([
                'polls',
                'neededInfo'
            ]),
            pollObject() {
                return this.polls.find((poll) => poll._id === this.id);
            },
        },
        mounted() {
            this.socket.on('vote', (data) => {
                this.increment = data.count;
                this.optionToUpdate = data.option;
            });
            this.id = this.$route.params.id;
            let token = this.neededInfo.token
            let headers = {
                headers: { Authorization: `Bearer ${token}` }
            }
            this.$http.get(`poll/${this.id}`, headers)
                .then(data => {
                    this.poll = data.data;
                    this.isUser = (this.neededInfo.userId === this.poll.user) ? true : false
                });
            this.$http.get(`poll/${this.id}/poll-options`, headers)
                .then((data) => {
                     this.options.push(...data.data);
                     console.log(data.data);
                }
               )
            .catch(err => console.log(err));
        },
        methods: {
            generateTotalVote(instance) {
                return instance.votes.length;
            },
            vote(option) {
                let token = this.neededInfo.token
                let headers = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                let optionId = option._id;

                if (!this.voted) {
                    this.$http.post(`poll/${this.id}/${optionId}/votes`, {}, headers)
                    .then((data) => {
                            let message = {count: 0, option: data.data.pollOption}
                            let type = data.data.type;
                            if (type === 'increase') message.count++ ;
                            this.socket.emit('vote', message);
                            this.voted = true;
                        })
                    .catch(err => console.log(err));
                }
                

            },
            deletePoll() {
                let token = this.neededInfo.token
                let headers = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.delete(`poll/${this.id}`, headers)
                .then(data => {
                    this.$router.push({name:'polls'});
                })
            },
            updateOptionCount(option) {
                if (this.optionToUpdate === option.value){
                    return this.increment + this.generateTotalVote(option);
                } 
                return this.generateTotalVote(option);
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
