<template>
    <div class="wrapper">
        <p class="wrapper__text"> 
            I want you to know that you are awesome 
            <span class="emoji"> 💜 💜 💜 💜 💜 💜 </span>
        </p>
        <div class="loader"></div>
    </div>
</template>


<style scoped>
.wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.wrapper__text {
    margin: 3rem;
    font-size: 2rem;
    font-weight: 600;
    color: #212121;
}
.loader {
  display: flex;
  width: 5em;
  height: 5em;
  border: 3px solid transparent;
  border-top-color: #673ab7;
  border-bottom-color: #673ab7;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.loader:before {
  content: '';
  display: block;
  margin: auto;
  width: 1em;
  height: 1em;
  border: 3px solid #673ab7;
  border-radius: 50%;
  animation: pulse 1s alternate ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
}

</style>