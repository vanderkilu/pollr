<template>
  <div class="wrapper">
    <app-header-main>
      <router-link :to="{name: 'create'}" class="btn-cta">create poll now</router-link>
      <router-link :to="{name: 'login'}" class="login">Login here 👉</router-link>
    </app-header-main>
    <section class="wrapper__main">
      <h3 class="wrapper__main-text">Poll Collections</h3>
      <div class="category">
          <router-link :to="{name: 'polls', params: {id: category._id}}" v-for="category in categories" :key="category.id" class="link">
               <div class="category__card">
                    <p class="c">{{category.name}}</p>
                    <div class="decor-wrapper">
                        <span class="decor decor-1"></span>
                        <span class="decor decor-2"></span>
                        <span class="decor decor-3"></span>
                    </div>
                   
                </div>
          </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderMain from "./HeaderMain.vue"
import { getAllCategory } from '../api'
export default {
  data() {
    return {
        classes: ['c-1','c-2', 'c-3'],
        categories: []
    };
  },
  methods: {
      generateClass() {
          let num = Math.floor(Math.random() * 3)
          return this.classes[num]
      },
      async getCategories() {
          const data = await getAllCategory()
          this.categories = data.data
      }
  },
  components: {
    appHeaderMain: HeaderMain
  },
  beforeMount() {
      this.getCategories()
  }

};
</script>


<style scoped>
.wrapper__main {
  padding: 8rem 10rem;
  background-color:#eeeeee;
}
.wrapper__main-text {
  font-size: 2rem;
  margin-bottom: 5rem;
  color: #7b1fa2;
  font-weight: 200;
}
.category {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  font-size: 1.5rem;
}
.category__card {
  padding: 2rem;
  border-radius: 3px;
  box-shadow: 0.2rem 0.5rem 1rem rgba(0, 0, 0, 0.01);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
  color: #7b1fa2;
}
.category__card-background {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}
@media only screen and (max-width : 900px) { 
  .category {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  .wrapper__main {
    padding: 5rem;
    background-color: whitesmoke;
  }
}
</style>
