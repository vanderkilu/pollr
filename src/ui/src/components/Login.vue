<template>
    <div> 
        <div class="login-card">
            <div class="content-left">
                <h3 class="content-left__text-bold"> Welcome Back </h3>
                <p class="content-left__text-small">enter your login details and start your polling now</p>
                <button class="btn-auth btn-auth-transparent" @click="$router.push({name:'signup'})">sign up </button>
            </div>
            <div class="content-right">
                <h3 class="content-right__text-bold"> Sign in to pollr</h3>
                 <transition name="blank"  mode="out-in">
                    <h5 class="error" v-if="isError"> please, enter correct credentials </h5>
                </transition>
                <form class="auth-form" @submit.prevent="loginUser">
                    <input type="email" placeholder="email" class="input" v-model="email" required>
                    <input type="password" placeholder="password" class="input" v-model="password" required>
                    <button class="btn-auth btn-auth-colored" >sign in </button>
                </form>
            </div>
        </div>
    </div>

</template>


<script>
import {login} from '../api'
import {setAuth} from '../helpers'
export default {
    data() {
        return {
            email: '',
            password: '',
            isError: false
        }
    },
    methods: {
        async loginUser() {
            try {
                const data = await login({email:this.email, password: this.password})
                setAuth(data)
                this.$router.push({name: 'recent'}) 
            }
            catch(err) {
                setTimeout(()=> this.isError = false, 3000)
                this.isError = true;
            }
           
        }
    }
    
}    
</script>






<style scoped>
    @import url(../assets/auth.css);
</style>

