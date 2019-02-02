<template>
  <div id="app">
      <transition name="fade">
         <router-view></router-view>
      </transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.slide-right-enter-active, .slide-right-leave-active {
    transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-right-enter, .slide-right-leave-to {
    opacity: 0;
    transform: translateX(-5rem)
 }
.slide-left-enter-active, .slide-left-leave-active {
    transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-left-enter, .slide-left-leave-active {
    opacity: 0;
    transform: translate(5rem)
}
</style>