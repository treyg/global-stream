<template>
  <section class="section">
    <div class="search-container">
      <input
        type="text"
        v-model="search"
        v-on:keyup.enter="searchFor"
        placeholder="Search for a movie..."
        class="input is-primary"
      />
      <button class="button is-primary" @click="searchFor">Search</button>
    </div>
    <div class="search-results">
      <MovieCard
        v-for="{
          movie,
          id,
          title,
          vote_average,
          release_date,
          poster_path,
        } in movies"
        :key="id"
        :title="title"
        :vote_average="vote_average"
        :release_date="release_date"
        :poster_path="`${STATIC_API}${poster_path}`"
      />
    </div>
  </section>
</template>

<script>
import MovieCard from "./MovieCard.vue";
export default {
  components: { MovieCard },
  name: "Search",
  data() {
    return {
      search: "",
      movies: [],
      MAIN_API: "https://api.themoviedb.org/3/search/movie",
      STATIC_API: "https://image.tmdb.org/t/p/original/",
    };
  },
  methods: {
    async searchFor() {
      const response = await fetch(
        `${this.MAIN_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&query=${this.search}`
      );
      const data = await response.json();
      this.movies = data.results;
      this.sortByRating();
    },
    sortByRating() {
      this.movies.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });
    },
  },
  // filters: {
  //   formatDate(date) {},
  // },
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.2em;
}

.search-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2em;
}
</style>
