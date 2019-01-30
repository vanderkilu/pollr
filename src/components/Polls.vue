<template>
    <div class="wrapper">
        <router-link :to="{name: 'poll', params:{id: poll._id}}" class="link" v-for="poll in polls" :key="poll._id">
            <div class="poll-card">
                <p class="poll-card__text ">{{poll.title}}</p>
                <p class="poll-card__name ">by {{poll.user.profile}}</p>
                <p class="poll-card__votes">{{getCount(poll)}} votes</p>
                
            </div>
        </router-link>
    </div>
</template>

<script>
import { getAllPollsForCategory } from '../api'
export default {
    data() {
        return {
            polls: []
        }
    },
    computed: {
       
    },
    methods: {
        async getPolls() {
            let data = await getAllPollsForCategory(this.$route.params.id)
            this.polls = data.data
        },
         getCount(poll) {
            if (!poll.pollOptions) return
            let count = poll.pollOptions.reduce((acc, option) => acc + option.votes.length, 0)
            return count
        }
    },
    mounted() {
        this.getPolls()
    }
}
    
</script>

<style scoped>
.wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    margin: 10rem 0;
}
.poll-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-radius: 3px;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
    background-color: white;
    font-size: 1.4rem;
    transition: all 0.4s;
}
.poll-card:hover {
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.03);
}
.poll-card__name {
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
}
.poll-card__votes {
    background-color: #fce4ec;
    color: #d81b60;
    padding: 0.8rem;
    font-size: 1.2rem;
}
.poll-card__time {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}
.link {
    color: black;
}
</style>
