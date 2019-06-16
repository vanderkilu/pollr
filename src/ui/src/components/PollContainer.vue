<template>
<div>
    <app-header>
         <router-link :to="{name: 'create'}" class="btn-cta">create poll now</router-link>
    </app-header>
    <nav class="navigation">
        <div class="nav">
            <router-link :to="{name:'recent'}" class="nav__link" >Recent polls</router-link>
            <router-link :to="{name: 'create'}" class="nav__link" exact>Create Poll</router-link>
            <router-link :to="{name: 'popular'}" class="nav__link">Trending Polls</router-link>
            <router-link :to="{name: 'manage'}" class="nav__link" exact>Manage your Polls</router-link>
        </div>
        <transition name="fade" mode="out-in">
            <router-view :key="$route.path"></router-view>
        </transition>
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
        },
    }
</script>

<style scoped>
.navigation {
    padding: 5rem;
    width: 60%;
    margin: 2rem auto;
    scroll-behavior: smooth !important;
    height: 100vh;
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
.router-link-exact-active{
    color: #d81b60;
}
@media only screen and (max-width : 900px) {
    .nav {
        flex-wrap: wrap;
        text-align: center;
    }
    .navigation {
        width: 70%;
    }
}

</style>

