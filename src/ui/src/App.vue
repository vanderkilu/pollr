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
.emoji {
  color: #673ab7;
  margin-left: 1rem;
}
.btn {
  padding: 2rem 4rem;
  border: none;
  border-radius: 3px;
  box-shadow: 0 1rem 2rem rgba(0,0,0,0.01);
  font-size: 1.4rem;
  transition: all 0.4s;
}
.logo {
  width: 4rem;
  height: 4rem;
  display: block;
}
</style>