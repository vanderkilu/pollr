<template>
    <div class="wrapper">
        <div class="search-container text-center">
            <router-link :to="{path: '/pollContainer' }" class="nav-link"><span class="cp-small">livr-polls</span></router-link>
            <form @submit.prevent="handleSearch">
                <input type="text" placeholder="search" v-model="search"> 
                <button type="submit" class="btn btn-outline-success ml-5">search</button>
            </form>
        </div>
        <div class="polls-container">
            <div class="container">
                <div class="row">
                    <div v-for="poll in matchedPolls" :key="poll._id" class="col-md-6">
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
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                matchedPolls: [],
                search: ''
            }
        },
        computed: {
            ...mapGetters([
                'searchParam',
                'polls'
            ])
        },
        methods: {
            filterSearch(param) {
                let filtedPolls = this.polls.filter(poll => poll.title.indexOf(param) !== -1);
                return filtedPolls
            },
            handleSearch() {
                if (this.search !== '') {
                    this.matchedPolls = this.filterSearch(this.search)
                    this.search = ''
                }
            }
        },
        mounted() {
            this.matchedPolls = this.filterSearch(this.searchParam);
        }
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
.wrapper {
    margin-top: 2rem;
}
.cp-small{
  font-size: 2rem;
  color: #5cdb95;
  font-family: 'Charmonman', cursive;
}
</style>