<template>
    <div>
        <app-poll-card :polls="polls" path="poll"></app-poll-card>
        <app-loader v-show="isLoading"></app-loader>
    </div>
  
    
</template>

<script>
import PollCard from './PollCard.vue'
import Loader from './Loader.vue'
export default {
    props: ['name'],
    data() {
        return {
            polls: [],
            isLoading: true
        }
    },
    computed: {
       
    },
    methods: {
        async getPolls() {
            const data = await this.name()
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

