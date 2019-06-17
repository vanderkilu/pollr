<template>
    <div class="wrapper">
        <router-link :to="{name: path, params:{id: poll._id}}" class="link" v-for="poll in polls" :key="poll._id">
            <div class="poll-card">
                <span class="poll-card__category">{{poll.category.name}}</span>
                <h1 class="poll-card__text ">{{poll.title}}</h1>
                <p class="poll-card__time">created on 18th july 1990 </p>
                <p class="poll-card__votes">{{poll.count}} votes</p>
                <slot></slot>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['polls','path'],
}
</script>

<style scoped>
.wrapper {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;
    margin: 10rem 0;
}
.poll-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem 4rem;
    border-radius: 5px;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
    background-color: white;
    transition: all 0.5s;
    height: 15rem;
    position: relative;
}
.poll-card > * {
    margin: 0.2rem;
}
.poll-card:hover {
   transform: scale(1.02) translateX(2rem);
}
.poll-card__text {
    color: #616161;
    font-size: 2.5rem;
}
.poll-card__time {
    font-size: 1.2rem;
    color: #bdbdbd;
}
.poll-card__votes {
    color: #7b1fa2;
    font-size: 1.2rem;
    border-radius: 3px;
    padding: 1rem 2rem;
    background-color: #f3e5f5;
    border-radius: 6rem;
    position: absolute;
    bottom: 1rem; 
    right: 2rem;
    border: 2px solid #e1bee7;
    box-shadow: 0 0.5rem 1rem #f3e5f5;
}
.poll-card__category {
    color: #b71c1c;
    font-size: 1.2rem;
    border-radius: 3px;
    padding: 0.5rem 2rem;
    background-color: #ffebee;
    border-radius: 6rem;
}
.link {
    color: black;
}
@media only screen and (max-width : 900px) { 
  .wrapper {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>