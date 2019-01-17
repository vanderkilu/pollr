<template>
<div>
    <app-header></app-header>
    <router-view></router-view>
    <footer class="footer text-center">
            <hr>
            <p> &copy; copyright 2018</p>
            <p> made with  <i class="text-red">&hearts;</i> by @kweku_kilu </p>
    </footer>
</div>
    
</template>

<script>
    import Header from './Header.vue'
    export default {
        beforeRouteEnter (to, from, next) {
            if (localStorage.getItem('jwt') === null) {
                next('/login');
            }
            else {
                next();
            }
        },
        components: {
            appHeader: Header
        }
    }
</script>
