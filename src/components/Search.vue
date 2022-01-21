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
      <MediaCard
        v-for="{
          movie,
          id,
          title,
          vote_average,
          release_date,
          poster_path,
          overview,
        } in results"
        :key="id"
        :title="title"
        :type="movie"
        :summary="overview"
        :vote_average="vote_average"
        :release_date="release_date"
        :poster_path="`${STATIC_API}${poster_path}`"
      />
    </div>
  </section>
</template>

<script>
import MediaCard from "./MediaCard.vue";
export default {
  components: { MediaCard },
  name: "Search",
  data() {
    return {
      search: "",
      results: [],
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
      this.results = data.results;
      this.sortByRating();
    },
    sortByRating() {
      this.results.sort((a, b) => {
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
