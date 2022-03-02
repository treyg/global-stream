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
          original_language,
          vote_average,
          release_date,
          poster_path,
          overview,
        } in results"
        :key="id"
        :id="id"
        :lang="original_language"
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
};
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  width: 85vw;
  margin: 0 auto;
}

input {
  border-radius: 0.3em;
  height: 2em;
  border: 0.1em solid var(--primary);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  text-indent: 0.5em;
  width: 100%;
}

::placeholder {
  font-size: 1em;
}

.input:focus {
  outline: none !important;
  box-shadow: 0 0 0.5em rgba(104, 207, 248, 0.644);
}

.search-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2em;
}
</style>
