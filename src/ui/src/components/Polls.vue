<template>
   <app-poll-card :polls="polls" path="poll"></app-poll-card>
</template>

<script>
import { getAllPollsForCategory } from '../api'
import PollCard from './PollCard.vue'
export default {
    data() {
        return {
            polls: []
        }
    },
    methods: {
        async getPolls() {
            const data = await getAllPollsForCategory(this.$route.params.id)
            this.polls = data.data
        },
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
.link {
    color: black;
}
</style>
