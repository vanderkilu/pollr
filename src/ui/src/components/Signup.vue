<template>
    <div> 
        <div class="login-card">
             <div class="content-right">
                <h3 class="content-right__text-bold"> create an account </h3>
                <transition-group name="blank" mode="out-in">
                    <h5 class="error" v-if="isError"> password is too similar to username/email </h5>
                </transition-group>
                <form class="auth-form" @submit.prevent="register()">
                    <input type="text" placeholder="name" class="input" v-model="profile" required>
                    <input type="email" placeholder="email" class="input" v-model="email" required>
                    <input type="password" placeholder="password" class="input" v-model="password" required>
                    <button class="btn-auth btn-auth-colored">sign up </button>
                </form>
            </div>
            <div class="content-left">
                <h3 class="content-left__text-bold"> Hello, Friend </h3>
                <p class="content-left__text-small">enter your personal details and start your polling now</p>
                <button class="btn-auth btn-auth-transparent" @click="$router.push({name:'login'})">sign in </button>
            </div>
        </div>
    </div>
</template>


<script>
import {login, signup } from '../api'
import { setAuth } from '../helpers'
export default {
    data() {
        return  {
            email: '',
            password: '',
            profile: '',
            isError: false
        }
    },
    methods: {
        async register() {
            const credentials = {
                 email:this.email, 
                 password:this.password,
                 profile:this.profile };
            try {
                await signup(credentials)
                const loginData = await login(credentials)
                setAuth(loginData)
                this.$router.go(-1)
            }
            catch(err) {
                setTimeout(()=> this.isError = false, 3000)
                 this.isError = true
            } 
        }
    }
}    
</script>






<style scoped>
    @import url(../assets/auth.css);
</style>

