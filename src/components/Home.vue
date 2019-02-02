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
                    <h5 class="c" :class="category.style">{{category.name}}</h5>
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
          let data = await getAllCategory()
          this.categories = data.data
          this.categories = this.categories.map(category => { 
              category.style = this.generateClass()
              return category
          })
          console.log(this.categories)
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
  background-color: whitesmoke;
}
.wrapper__main-text {
  font-size: 2rem;
  margin-bottom: 5rem;
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
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.03);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
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
.category__card-count {
    transition: all 0.5s;
}
.category__card-background:hover .category__card-count {
    transform: rotate(90deg);
}
.c {
    padding: 0.8rem;
    border-radius: 3px;
    font-weight: 100;
}
.c-1 {
    background-color: #fffde7;
    color: #f57f17;
}
.c-2 {
    color:#afb42b;
    background-color:#f9fbe7;
}
.c-3 {
    color:#33691e;
    background-color:#f1f8e9;
}
.link {
    color: black;
}
</style>
