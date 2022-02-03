<template>
  <div class="home">
    <h1>This is the home page</h1>
    <Search />
    <PopularMovies />
  </div>
</template>
<script>
import Search from "../components/Search.vue";
import PopularMovies from "../components/PopularMovies.vue";
export default {
  name: "Home",
  components: { Search, PopularMovies },
};
</script>
