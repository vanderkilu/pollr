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
                 <transition name="blank">
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
                let data = await login({email:this.email, password: this.password})
                setAuth(data)
                this.$router.push({name: 'pollContainer'}) 
            }
            catch(err) {
                setTimeout(()=> this.isError = false, 3000)
                this.isError = true;
            }
           
        }
    }
    
}    
</script>






<style >
.login-card {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.04);
    border-radius: 4rem;
    background-color: white;
}
.content-left {
    background-color: #673ab7;
    color: white;
    padding: 2rem;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.content-left__text-bold {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 2rem;
}
.content-right__text-bold {
    text-align: center;
    color: #673ab7;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 5rem;
}
.content-left__text-small {
    font-size: 1.6rem;
    padding: 3rem;
}
.content-right  {
    padding: 5rem 10rem;
}
.auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.input {
    padding: 2rem 4rem;
    background-color: #eeeeee;
    border: none; 
    margin: 1rem;
    
}
.input:focus {
    outline: none;
}

::-webkit-input-placeholder { 
  font-size: 1.4rem;
  text-align: left;
}
::-moz-placeholder { 
  font-size: 1.4rem;
  text-align: left;
}
:-ms-input-placeholder { 
  font-size: 1.4rem;
  text-align: left;
}
:-moz-placeholder { 
  font-size: 1.4rem;
  text-align: left;
}
.btn-auth {
    padding: 1.8rem 8rem;
    border: none;
    border-radius: 10rem;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.01);
    font-size: 1.4rem;
    transition: all 0.4s;
    margin-top: 3rem;
    color: white;
    cursor: pointer;
}
.btn-auth:hover {
    transform: scale(1.06);
}
.btn-auth:focus , .btn-auth:active{
    outline: none;
}
.btn-auth-transparent {
    background-color: transparent;
    border: 1px solid white;
}
.btn-auth-colored {
     background-color:#673ab7;
}
</style>

