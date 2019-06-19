<template>
  <div class="wrapper">
    <app-header-main>
      <router-link :to="{name: 'recent'}" class="btn-cta btn">check recent polls </router-link>
      <router-link :to="{name: 'login'}" class="login">Login here 👉</router-link>
    </app-header-main>

    <section class="wrapper__easy">
      <div class="sides">
        <div class="left__side">
          <h3 class="heading"> It's simple </h3>
          <ul class="left__side-detail">
            <p class="left__side-text"><i class="check">&#10004;</i> Select a poll you will like to vote on </p>
            <p class="left__side-text"><i class="check">&#10004;</i>Sign up or login </p>
            <p class="left__side-text"><i class="check">&#10004;</i>Vote simply by clicking on one of the poll options </p>
            <p class="left__side-text"><i class="check">&#10004;</i> You can also easily create your own polls </p>
            <p class="left__side-text"><i class="check">&#10004;</i> See results in real time </p>
            <router-link :to="{name: 'create'}" class="btn btn-colored">create a poll now </router-link>
          </ul>
        </div>
        <div class="right__side">
          <img src="../assets/easy-poll.png" alt="poll" class="right__side-img">
        </div>
      </div>
    </section>


    <section class="wrapper__main">
      <h3 class="heading heading-center"> Browse collections </h3>
      <div class="category">
          <router-link :to="{name: 'polls', params: {id: category._id}}" v-for="category in categories" :key="category.id" class="link">
               <div class="category__card">
                    <p class="c">#{{category.name}}</p>
                </div>
          </router-link>
      </div>
    </section>

    <div class="footer">
       <p class="footer__madeby">
            Made with 
            <span class="emoji">💜</span>
            by 
            <a class="footer__link" target="_blank"  rel="noopener noreferrer"
            href="http://twitter.com/kweku_kilu">kweku_kilu</a>
        </p>
    </div>
  </div>
</template>

<script>
import HeaderMain from "./HeaderMain.vue"
import { getAllCategory } from '../api'
export default {
  data() {
    return {
        categories: []
    };
  },
  methods: {
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
  padding: 0 10rem;
  padding-top: 5rem;
  padding-bottom: 8rem;
  background-color: #673ab7;
}

/**/
.wrapper__easy {
  padding: 10rem;
  padding-top: 15rem;
  background-color: white;
}
.sides {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10rem;
}
.heading {
  font-size: 4rem;
  color: #212121;
  font-weight: 600;
  margin: 5rem 0;
}
.left__side-text {
  font-size: 1.8rem;
  color: #757575;
  margin-bottom: 2rem;
}
.left__side-detail {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.right__side-img {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.2);
}
.check  {
  color: #673ab7;
  margin-right: 1rem;
}
.btn-colored {
  background-color: #673ab7;
  color:#ede7f6;
  width: 15rem;
}
.btn-cta:hover {
  color: gray;
}
/**/


.category {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  font-size: 1.5rem;
  width: 60%;
  margin: 0 auto;
}
.category__card {
  padding: 2rem;
  color: white;
}
.c {
  font-size: 1.7rem;
}
.heading-center {
  color: white;
  text-align: center;
}

.footer {
  padding: 3rem;
  background-color: white;
}
.footer__madeby {
  font-size: 1.4rem;
  color: #424242;
  text-align: center;
}
.footer__link {
  color: #673ab7;
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
