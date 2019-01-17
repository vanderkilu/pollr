<template>
    
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

