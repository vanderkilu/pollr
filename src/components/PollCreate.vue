<template>
    <div class="wrapper">
        <form action="" class="form">
            <p class="wrapper__text"> Let us poll together <span class="emoji"> 😇</span> </p>
            <input type="text" class="input" placeholder="question">
            <transition-group name="list">
                    <input type="text" class="input" :placeholder="opt.value + i"  v-for="(opt,i) in alts" :key="i">
            </transition-group>
            <div class="option-controls">
                <span class="add" @click="addOption">&plus;</span>
                <span class="remove" @click="removeOption">&times;</span>
            </div>
            <button class="btn-auth btn-auth-colored">create poll</button>
        </form>
        <div class="wrapper-side">
            Create your poll now! <span class="emoji"> 😇</span>
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
                alts: [{value: 'option '},{value: 'option '}]
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
                this.alts.push({value: 'option '});
            },
            removeOption() {
                this.alts = this.alts.slice(0, this.alts.length-1);
            }
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
}
.list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(3rem);
}
.list-leave-active {
    position: absolute;
}

</style>
