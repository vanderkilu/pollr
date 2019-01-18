<template>
    <div class="wrapper">
        <router-link :to="{}" class="link">
            <div class="poll-card">
                <p class="poll-card__text ">cat or dogs?</p>
                <p class="poll-card__name ">By Kweku Kilu</p>
                <p class="poll-card__time "> 4 min ago</p>
                <p class="poll-card__votes ">54 votes</p>
            </div>
        </router-link>
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
