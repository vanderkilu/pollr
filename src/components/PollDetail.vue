<template>
    <div>
        <app-header></app-header>
        <div v-if="isUser" class="text-center poll-edit">
            <router-link :to="{name:'edit', params: {id: this.$route.params.id }}" class="green-text">Edit</router-link> 
            or <a href="#" @click.prevent="deletePoll" class="green-text"> Delete </a> this post
        </div>
        <div class="vote-wrapper">
            <div v-for="option in options" :key="option._id" class="vote-card">
               <p>{{option.value}}</p>   
               <p>{{ updateOptionCount(option) }}</p>
            </div>
        </div>
        <div class="poll-detail-container">
            <div class="poll">
                <div class="poll-card">
                    <p> {{ poll.title }}</p>
                    <div class="poll-options">
                        <button @click="vote(option)" v-for="option in options" :key="option._id" class="btn btn-option">{{option.value}}</button>
                    </div>
                </div>
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
                options: [],
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
.poll-detail-container  {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}
.poll{
    display: table;
    background-color: white;
    box-shadow: 0 1.2rem 2.2rem rgba(0, 0, 0, 0.04);
}
.btn-option{
    padding: 2rem;
    color: white;
    border-radius: 2px;
    box-shadow: 0 0.4rem 0.5rem rgba(0, 0, 0, 0.04);
    margin: 1rem;
    background-color: #5cdb95;
}
.vote-wrapper {
    margin-top: 5rem;
    text-align: center;
}
.vote-card {
    display: inline-block;
    width: 20%;
    margin: 0 2rem;
    padding: 1rem 0.5rem;
    background-color: white;
    box-shadow: 0 1.2rem 2.2rem rgba(0, 0, 0, 0.04);
    border-radius: 3px;
    text-align: center;
}
.poll-edit {
    margin-top: 3rem;
}
.green-text {
    color:#5cdb95; 
}
</style>
