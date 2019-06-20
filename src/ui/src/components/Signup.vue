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
                    <div class="loader__small" v-if="isLoading"></div>
                    <button class="btn-auth btn-auth-colored" v-else>sign up </button>
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
            isError: false,
            isLoading: false
        }
    },
    methods: {
        async register() {
            this.isLoading = true
            const credentials = {
                 email:this.email, 
                 password:this.password,
                 profile:this.profile };
            try {
                await signup(credentials)
                const loginData = await login(credentials)
                setAuth(loginData)
                this.isLoading = false
                this.$router.push({name: 'home'})
            }
            catch(err) {
                this.isLoading = false
                setTimeout(()=> this.isError = false, 3000)
                this.isError = false
            } 
        }
    }
}    
</script>






<style scoped>
    @import url(../assets/auth.css);
    .loader__small {
        border: 0.6rem solid #f3f3f3;
        border-top: 0.6rem solid #4a148c;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

