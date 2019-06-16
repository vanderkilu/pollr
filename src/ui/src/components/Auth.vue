<template>
    <div class="auth-wrapper">
        <router-link :to="{name: 'home'}">
            <img src=../assets/logo.png class="logo" alt="logo">
        </router-link>
        <div class="auth-container">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>


<style scoped>
    .auth-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .auth-container {
        width: 60%;
        margin: 5rem auto;
    }
    @media only screen and (max-width : 900px) { 
        .auth-container {
            width: 80%;
        }
    }
    
</style>