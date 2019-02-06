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
.slide-right-leave-active, .slide-left-leave-active, .fade-leave-active {
    position: absolute;
}
.decor {
    margin-right: 0.5rem;
    display: block;
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
}
.decor-1 {
    background-color: #f4ff81;
}
.decor-2 {
    background-color: #40c4ff;
}
.decor-3 {
    background-color: #d81b60;
}
.decor-wrapper {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
}
</style>