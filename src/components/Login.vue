<template>
    <div class="container container-main">
        <div class="signup-card">
            <h3 class="signup-text text-center"> Login </h3>
            <form @submit.prevent="login">
                <input type="text" name="email" placeholder="email" v-model="email">
                <input  type="password" name="password" placeholder="password" v-model="password">
                <button type="submit" class="btn btn-custom"> Login </button>
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
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            const userDetails = {
                email: this.email,
                password: this.password
            }
            this.$http.post('account/login', userDetails)
                .then(data => {
                    console.log(data);
                    localStorage.setItem('jwt', JSON.stringify(data.data.token));
                    localStorage.setItem('id', JSON.stringify(data.data.id));
                    this.$router.push('/pollContainer');
                })
        },
    }
    
}    
</script>






<style scoped>

:root {
    --color-base: #8860d0;
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
.footer {
    margin-top: 5rem;
}
.container-main {
    position: relative;
}
</style>

