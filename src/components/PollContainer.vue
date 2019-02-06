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
            <router-link :to="{name: 'u'}" class="nav__link" exact>Manage your Polls</router-link>
        </div>
        <transition :name="transitionName">
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
        computed: {
            isVisited() {
                this.visited = false;
                this.visited = true
            }
        },
        components: {
            appHeader: HeaderMain
        },
        watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
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
.router-link-exact-active{
    color: #d81b60;
}

</style>

