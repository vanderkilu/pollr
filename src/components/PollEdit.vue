<template>
    <div class="text-center">
        <div class="form-container">
            <p class="instructions">create polls by adding a question <br> and two alternatives </p>
            <form @submit.prevent="updateAll" class="poll-create">
                <input type="text" placeholder="question" v-model="poll">
                <input type="text" placeholder="first alternative" v-model="altA.value">
                <input type="text" placeholder="second alternative" v-model="altB.value">
                <button type="submit" class="btn btn-custom"> update </button>
            </form>
        </div>
    </div>
</template>



<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    data() {
        return {
            poll: '',
            altA: '',
            altB: '',
        }
    },
    computed: {
        ...mapGetters([
            'headers',

        ])
    },
    mounted() {
        let id = this.$route.params.id;
        this.$http.get(`poll/${id}`, this.headers)
            .then(data => {
                this.poll = data.data.title;
                this.altA = data.data.pollOptions[0];
                this.altB = data.data.pollOptions[1];
            });
    },
    methods: {
        updatePoll(id) {
            return this.$http.put(`poll/${id}`, {title: this.poll}, this.headers);
        },
        updateOption(id, option) {
            return this.$http.put(`poll/${id}/poll-options/${option._id}`, {value: option.value}, this.headers);
        },
        updateAll() {
            let id = this.$route.params.id;
            axios.all([this.updatePoll(id), this.updateOption(id, this.altA), this.updateOption(id, this.altB)])
            .then(axios.spread((a, b, c) => {
                 this.$router.push({name:'polls'});
            }));
        }
    }
}
</script>

