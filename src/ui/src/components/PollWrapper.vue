<template>
    <app-poll-card :polls="polls" path="poll"></app-poll-card>
</template>

<script>
import PollCard from './PollCard.vue'
export default {
    props: ['name'],
    data() {
        return {
            polls: []
        }
    },
    computed: {
       
    },
    methods: {
        async getPolls() {
            let data = await this.name()
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

