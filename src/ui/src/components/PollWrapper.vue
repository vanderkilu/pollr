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
            try {
                let data = await this.name()
                this.polls = data.data
            }
            catch(err) {
                console.log(err)
            }
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

