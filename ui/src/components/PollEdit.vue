<template>
    <div class="wrapper">
        <form  class="form" @submit.prevent="updatePoll">
            <p class="wrapper__text"> Edit this poll <span class="emoji"> 😇</span> </p>
            <input type="text" class="input" placeholder="question" v-model="poll.title">
            <input type="text" class="input" :placeholder="option.value" 
                v-for="option in options" :key="option._id"
                v-model="option.value">
            <button class="btn-auth btn-auth-colored">update poll</button>
            <button class="btn-auth btn-auth-colored-danger" @click.prevent="removePoll">delete Poll</button>
        </form>
        <div class="wrapper-side">
            Edit this poll now! <span class="emoji"> 😇</span>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
import {getPoll, getAllOptionsForPoll,updatePoll, updatePollOption, deletePoll} from '../api'
export default {
    data() {
        return {
            categories: [],
            poll: null,
            options: [],
            id: this.$route.params.id
        }
    },
    methods: {
        async getOptions() {
            let options = await getAllOptionsForPoll(this.id)
            this.options = options.data
        },
        async thisPoll() {
            let poll = await getPoll(this.id)
            this.poll = poll.data
        },
        async updatePoll() {
            const pollData = {
                poll: this.poll,
            }
            let pollUpdate = await updatePoll(this.id, pollData)
            Promise.all(this.options.map((option)=> updatePollOption(this.id, {option:option})))
                    .then((values)=> this.$router.push({name: 'poll', params: {id: this.id}}))
        },
        async removePoll() {
            let poll = await deletePoll(this.id)
            this.$router.push({name: 'manage'})
        }
    },
    mounted() {
        this.getOptions()
        this.thisPoll()
    }
}
</script>

<style scoped>
.wrapper {
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.04);
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin: 10rem 0;
}
.form {
    padding: 8rem 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.wrapper-side {
    padding: 8rem 3rem;
    background-color: #673ab7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: white;
    text-align: center;

}
.wrapper__text {
    font-size: 1.6rem;
    margin-bottom: 2rem;
}
.emoji {
    color: #d81b60;
    font-size: 1.4rem;
}
.add, .remove {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    color: #673ab7;
    background-color: #ede7f6;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.04);
    margin: 0 1rem;
}
.remove {
    background-color: #fce4ec;
    color: #d81b60;
}
.option-controls {
    display: flex;
}
.input {
    display: block;
    transition: all 1s;
    font-family: inherit;
}
.select {
    padding: 2rem;
    margin: 2rem 0;
    border: none;
    background-color: #eeeeee;
    color: black;
}
.select:focus {
    outline: none;
}    
.btn-auth-colored-danger {
    background-color: #ffcdd2;
    color: #d81b60;
}
@media only screen and (max-width : 900px) { 
    .wrapper {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    .wrapper-side {
        padding: 2.5rem;
    }
    .form {
        text-align: center;
        padding: 4rem;
    }
    .input {
        width: 12rem;
    }
    .btn-auth {
        padding: 2rem 4rem;
    }
}
</style>
