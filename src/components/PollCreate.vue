<template>
    <div class="text-center">
        <div class="form-container">
            <p :class="{errors:isError}" class="hide"> please you can't leave any of the field blank </p>
            <p class="instructions">create polls by adding a question <br> and two alternatives </p>
            <form @submit.prevent="createPoll" class="poll-create">
                <input @focus="isError = false"  type="text" placeholder="question" v-model="poll">
                <input v-for="alt in alts " :key="alt"
                    type="text" 
                    placeholder= "option"
                    v-model="alt.value">
                <button @click.prevent="addOption" class="btn btn-custom mb-5"> add Option </button>
                <button type="submit" class="btn btn-custom"> Create Poll </button>
            </form>
        </div>
    </div>
</template>
<script>
    
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                poll: '',
                isError: false,
                alts: [{value: ''},{value: ''}]
            }
        },
        computed: {
            ...mapGetters([
                'neededInfo',
                'headers'
            ]),

        },
        methods: {
            validate() {
               return  this.alts.some((alt) => {
                    return alt.value === ''
                });
            },
            createPoll() {
                if (this.validate()) {
                    this.isError = true;
                    return;
                }
                let user_id = this.neededInfo.userId;
                let data = {
                    title: this.poll,
                    pollOptions: this.alts
                }
                this.$http.post(`poll/${user_id}/polls`, data, this.headers)
                    .then((data) => {
                        this.$router.push({name:'polls'});
                    })
                    .catch(err => console.log(err));
            },
            addOption() {
                this.alts.push({value: ''});
                console.log(this.validate());
            }
        }

    }
</script>
<style scoped>
.instructions {
    font-size: 0.9rem;
}
.hide {
    opacity: 0;
}
.errors {
    opacity: 1;
    background-color: #ffcdd2;
    font-size: 0.9rem;
    border-radius: 3px;
    padding: 1rem;
}
</style>
