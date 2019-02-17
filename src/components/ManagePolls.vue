<template>
    <div>
        <p class="text">Edit / Delete poll </p>
        <app-poll-card :polls="polls" path="edit"></app-poll-card>
    </div>
    
</template>


<script>
import { getPollsForUser } from '../api'
import { getAuth } from '../helpers'
import PollCard from './PollCard.vue'
export default {
    data() {
        return {
            polls: []
        }
    },
    methods: {
        async getPolls() {
            let data = await getPollsForUser(getAuth().userId)
            this.polls = data.data
        }
    },
    mounted() {
        this.getPolls()
    },
    components: {
        appPollCard: PollCard
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
</style>