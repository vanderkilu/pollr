<template>
    <div class="auth-container">
        <component :is="currentComponent"></component>
    </div>
</template>


<script>
import Login from './Login.vue'
import Signup from './Signup.vue'
export default {
    data() {
        return {
            currentComponent: 'appLogin'
        }
    },
    components: {
        appLogin: Login,
        appSignup: Signup
    }
}
</script>

<style scoped>
    .auth-container {
        width: 60%;
        margin: 5rem auto;
    }
    
</style>