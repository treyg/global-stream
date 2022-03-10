<template>
  <section class="section">
    <div class="search-container">
      <input
        type="text"
        v-model="search"
        v-on:keyup.enter="searchFor"
        placeholder="Search for a movie..."
      />
      <button @click="searchFor">Search</button>
    </div>
    <div class="search-results">
      <MediaCard
        v-for="result in results"
        :key="result.id"
        :id="result.id"
        :lang="result.original_language"
        :title="result.title"
        :type="result.movie"
        :vote_average="result.vote_average"
        :release_date="result.release_date"
        :poster_path="`${STATIC_API}${result.poster_path}`"
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
  padding: 0 3rem;
  margin: 0 auto;
  max-width: 78em;
}

input {
  border-radius: 0.3em;
  height: 5.5rem;
  border: 0.1em solid var(--primary);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  text-indent: 0.5em;
  width: 100%;
}

::placeholder {
  font-size: 2.4rem;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0.5em rgba(104, 207, 248, 0.644);
}

.search-results {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 90%;
  margin: 2em auto;
}
</style>
