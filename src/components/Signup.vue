<template>
    <div class="container">
        <div class="main">
            <h4 class="text-center main-text"> Welcome to <span class="cp">livr-polls</span></h4> 
        </div>
        <div class="signup-card">
            <h3 class="signup-text text-center"> Sign-up </h3>
            <form @submit.prevent="register">
                <input type="text" name="email" placeholder="email" v-model="email">
                <input  type="password" name="password" placeholder="password" v-model="password">
                <button type="submit" class="btn btn-custom"> Sign up </button>
                <router-link to="/login"  class="login-rather"> Login Rather </router-link>
            </form>
        </div>
         <div class="home-btn">
            <router-link :to="{name: 'home'}">
                <span><i class="fa fa-home text-green"></i></span>
            </router-link>
        </div>
         <footer class="footer text-center">
            <hr>
            <p> &copy; copyright 2018</p>
            <p> made with  <i class="text-red">&hearts;</i> by @kweku_kilu </p>
        </footer>
    </div>
</template>


<script>
export default {
    data() {
        return  {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            const userDetails = {
                email: this.email,
                password: this.password
            }
            this.$http.post('account/register', userDetails)
                .then((data) => {
                      console.log(data.data);
                      this.$router.push('/login');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    }
}    
</script>






<style scoped>

:root {
    --color-base: #5cdb95;
}

.signup-card {
    padding: 2rem;
    background-color:white;
    border-radius: 3px;
    width: 40%;
    margin: 5rem auto;
    box-shadow: 0 2rem 4rem rgba(0,0,0,0.03);
}
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.main-text {
  margin-top: 5rem;
}
.cp{
  font-size: 4rem;
  color: #5cdb95;
  font-family: 'Charmonman', cursive;
}
.login-rather {
    margin-top:2rem;
    color: #8860d0;
}
.footer {
    margin-top: 5rem;
}
</style>

