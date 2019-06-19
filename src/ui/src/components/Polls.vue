<template>
    <div>
        <app-poll-card :polls="polls" path="poll"></app-poll-card>
        <app-loader v-show="isLoading"></app-loader>
   </div>
</template>

<script>
import { getAllPollsForCategory } from '../api'
import PollCard from './PollCard.vue'
import Loader from './Loader'
export default {
    data() {
        return {
            polls: [],
            isLoading: true
        }
    },
    methods: {
        async getPolls() {
            const data = await getAllPollsForCategory(this.$route.params.id)
            this.polls = data.data
            this.isLoading = false
        },
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
.link {
    color: black;
}
</style>
