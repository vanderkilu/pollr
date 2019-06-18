<template>
  <div id="app">
      <transition name="fade" mode="out-in">
         <router-view></router-view>
      </transition>
  </div>
</template>

<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
}
  html {
    box-sizing: border-box;
    font-size: 62.5%;
}
  a:link, a:visited {
    text-decoration: none;
    color: white;
}
  body {
    font-family: 'Montserrat', sans-serif;
    line-height: 1.6;
    font-weight: 300;
    background-color:#f5f5f5;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.logo {
  width: 4rem;
  height: 4rem;
  display: block;
}
</style>