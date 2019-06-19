<template>
    <div>
        <p class="text">Edit / Delete poll </p>
        <p class="no-poll" v-if="polls.length === 0"> You currently have no polls </p>
        <app-poll-card :polls="polls" path="edit"></app-poll-card>
        <app-loader v-show="isLoading"></app-loader>
    </div>
    
</template>


<script>
import { getPollsForUser } from '../api'
import { getAuth } from '../helpers'
import PollCard from './PollCard.vue'
import Loader from './Loader.vue'
export default {
    data() {
        return {
            polls: [],
            isLoading: true
        }
    },
    methods: {
        async getPolls() {
            const data = await getPollsForUser(getAuth().userId)
            this.polls = data.data
            this.isLoading = false
        }
    },
    mounted() {
        this.getPolls()
    },
    components: {
        appPollCard: PollCard,
        appLoader: Loader
    }
}
</script>

<style scoped>
.text {
    color:  #7b1fa2;
    text-align: center;
    font-size: 1.5rem;
    margin-top: 8rem;
    padding: 2rem;
    background-color: white;
}
.no-poll {
    margin-top: 2rem;
    font-size: 1.7rem;
    color: #212121;
    text-align: center;
}
</style>