<template>
    <div> 
        <div class="login-card">
             <div class="content-right">
                <h3 class="content-right__text-bold"> create an account </h3>
                <form class="auth-form">
                    <input type="text" placeholder="name" class="input">
                    <input type="email" placeholder="email" class="input">
                    <input type="password" placeholder="password" class="input">
                    <button class="btn-auth btn-auth-colored">sign up </button>
                </form>
            </div>
            <div class="content-left">
                <h3 class="content-left__text-bold"> Hello, Friend </h3>
                <p class="content-left__text-small">enter your personal details and start your polling now</p>
                <button class="btn-auth btn-auth-transparent">sign in </button>
            </div>
        </div>
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

</style>

