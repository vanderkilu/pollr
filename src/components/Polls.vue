<template>
    <div>
        <div class="polls-container">
            <div class="container">
                <div class="row">
                    <div v-for="poll in polls" :key="poll._id" class="col-md-6">
                        <div class="poll-card">
                            <p>{{ poll.title }}</p>
                            <div class="details">
                                <p class="username">{{ poll.user.username }}</p>
                                <p class="total-vote">{{ poll.votes.length }}</p>
                            </div>
                            <router-link class="poll-detail-link" :to="{name: 'poll-detail', params: {id: poll._id }}">view</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'polls',
            'neededInfo'
        ]),
    },
    methods: {
        ...mapActions([
            'setPolls'
        ]),
    },
    mounted() {
        let token = this.neededInfo.token
        let headers = {
            headers: { Authorization: `Bearer ${token}` }
        }
        this.$http.get('poll/polls', headers)
            .then(data => {
                console.log(data.data);
                this.setPolls(data.data);
            });
    },
}
    
</script>

<style scoped>
.polls-container {
    padding: 5rem 15rem;
}
.poll-detail-link {
    color:#8860d0;
}
.details {
    font-size: 0.7rem;
    display: table;
    margin: 0 auto;
    padding: 1rem;
    background-color: whitesmoke;
}
.username {
    
}

</style>
