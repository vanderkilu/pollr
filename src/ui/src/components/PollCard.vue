<template>
    <div class="wrapper">
        <router-link :to="{name: path, params:{id: poll._id}}" class="link" v-for="poll in polls" :key="poll._id">
            <div class="poll-card">
                <p class="poll-card__text ">{{poll.title}}</p>
                <p class="poll-card__name ">by {{poll.user.profile}}</p>
                <p class="poll-card__votes">{{poll.count}} votes</p>
                <slot></slot>
                <div class="decor-wrapper">
                    <span class="decor decor-1"></span>
                    <span class="decor decor-2"></span>
                    <span class="decor decor-3"></span>
                 </div>
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
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    margin: 10rem 0;
}
.poll-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-radius: 3px;
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.03);
    background-color: white;
    font-size: 1.4rem;
    transition: all 0.4s;
    height: 20rem;
}
.poll-card:hover {
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.03);
}
.poll-card__text {
    color: #7b1fa2;
}
.poll-card__name {
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    color: #bdbdbd;
}
.poll-card__votes {
    color: #7b1fa2;
    font-size: 1.2rem;
    border-radius: 3px;
}
.poll-card__time {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
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