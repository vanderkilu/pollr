<template>
<div>
    <app-header>
         <router-link :to="{name: 'create'}" class="btn-cta">create poll now</router-link>
    </app-header>
    <nav class="navigation">
        <div class="nav">
            <router-link :to="{name:'recent'}" class="nav__link">Polls</router-link>
            <router-link :to="{name: 'create'}" class="nav__link">Create Poll</router-link>
            <router-link :to="{}" class="nav__link">Popular Polls</router-link>
        </div>
        <router-view></router-view>
    </nav>
</div>
    
</template>

<script>
    import HeaderMain from './HeaderMain.vue'
    export default {
        beforeRouteEnter (to, from, next) {
            if (localStorage.getItem('jwt') === null) {
                next({name: 'login'});
            }
            else {
                next();
            }
        },
        components: {
            appHeader: HeaderMain
        }
    }
</script>

<style scoped>
.navigation {
    padding: 5rem;
    width: 60%;
    margin: 2rem auto;
}
.nav {
    display: flex;
    justify-content: center;
}
.nav__link {
    color: #673ab7;
    font-size: 1.5rem;
    padding: 0.8rem 2rem;
    margin: 0 2rem;
}
</style>

