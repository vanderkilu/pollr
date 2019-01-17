<template>
<div>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
   <router-link :to="{name: 'home' }" class="nav-link"><span class="cp-small">livr-polls</span></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mx-auto">
      <li class="nav-item">
        <router-link :to="{path: '/pollContainer' }" class="nav-link">Polls</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Popular polls</a>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'create'}" class="nav-link color-green">create poll</router-link>
      </li>
    </ul>
     <form @submit.prevent="setSearchParam" class="form-inline my-2 my-lg-0">
      <input class="mr-sm-2" type="search" placeholder="Search poll by name" aria-label="Search" v-model="search">
      <button  class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
</div>
    
</template>


<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions([
      'setSearch'
    ]),
    setSearchParam() {
      if (this.search !== '') {
         this.setSearch(this.search);
         this.$router.push({name: 'search'});
      }
    }
  }
}
</script>





<style scoped>

input {
    padding: 0.3rem 1rem;
    border-radius: 8rem;
    background-color: ghostwhite;
    border:1px solid grey;
    transition: all 0.8s;
}
input:focus {
  outline: none;
}
.btn-outline-success {
  color: #5cdb95;
  border-color: #5cdb95;
  border-radius: 3px;
}
.btn-outline-success:hover {
  background-color: #5cdb95;
  color: white;
}
.color-green {
  color: #5cdb95 !important;
}

</style>
