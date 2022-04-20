<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <section class="section">
    <div class="search-container">
      <input
        id="searchInput"
        type="text"
        v-model="search"
        v-on:keyup.enter="searchFor"
        placeholder="Search for a..."
      />
      <select v-model="searchType">
        <option
          class="option"
          v-for="option in searchTypeOptions"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
      <button @click="searchFor">Search</button>
    </div>
    <div class="search-results">
      <MediaCard
        v-for="result in results"
        v-if="result.poster_path"
        :key="result.id"
        :id="result.id"
        :lang="result.original_language"
        :title="result.title"
        :mediaType="result.media_type"
        :vote_average="result.vote_average"
        :release_date="result.release_date"
        :poster_path="`${STATIC_API}${result.poster_path}`"
      />
      <PersonCard
        v-if="person.profile_path"
        v-for="person in results"
        :key="person.id"
        :name="person.name"
        :id="person.id"
        :img_path="`${STATIC_API}${person.profile_path}`"
      />
    </div>
  </section>
</template>

<script>
import MediaCard from "./MediaCard.vue";
import PersonCard from "./PersonCard.vue";
export default {
  components: { MediaCard, PersonCard },
  name: "Search",
  data() {
    return {
      search: "",
      results: [],
      searchType: "movie",
      searchTypeOptions: [
        { id: "movie", name: "Movie" },
        { id: "tv", name: "TV Show" },
        { id: "person", name: "Person" },
      ],
      MAIN_API: "https://api.themoviedb.org/3/search/multi",
      STATIC_API: "https://image.tmdb.org/t/p/original/",
    };
  },
  methods: {
    async searchFor() {
      const response = await fetch(
        `${this.MAIN_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&query=${this.search}`
      );
      const data = await response.json();
      const fullData = data.results;
      //filter fullData by searchType id
      this.results = fullData.filter(
        (result) => result.media_type === this.searchType
      );
      //handle if no results are found
      if (this.results.length === 0) {
        document.querySelector(".search-results").innerHTML = `
          <h3>No results found</h3>
        `;
      }
      if (this.searchType !== "person") {
        this.sortByRating();
      }
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
  padding: 0 3rem;
  margin: 0 auto;
  max-width: 78em;
  height: 6em;
}

input,
select {
  border-radius: 0.3em;
  border: 0.1rem solid var(--primary);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  height: 100%;
  box-sizing: border-box;
}

input {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  text-indent: 0.5em;
  width: 100%;
}

select {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 2.5rem;
  margin-right: 0.5em;
}

.option {
  font-size: 2.5rem;
}

::placeholder {
  font-size: 2.4rem;
}

input:focus,
input:focus + select {
  outline: none;
  box-shadow: 0 0 0.5em rgba(104, 207, 248, 0.644);
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  max-width: 90%;
  margin: 5em auto;
  gap: 4em;
  padding-bottom: 10em;
}

/* Adjust mediacard styles for search results */
::v-deep .media-card button,
::v-deep .media-card .view-media-btn,
::v-deep .media-card h2,
::v-deep .media-card p,
::v-deep .media-card .details {
  display: none;
}

::v-deep .media-card figure {
  margin: 0;
}

@media (min-width: 769px) {
  ::v-deep .media-card {
    max-width: 32em;
  }
}
</style>
