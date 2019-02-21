<template>
    <div class="auth-container">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
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
    .auth-container {
        width: 60%;
        margin: 5rem auto;
    }
    
</style>