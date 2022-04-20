<template>
  <div>
    <h2>
      Top Rated in
      <select v-model="selectedRegion" @change="getTopRatedMovies">
        <option v-for="region in regions" :key="region.id" :value="region.id">
          {{ region.name }}
        </option>
      </select>
    </h2>
    <section class="top-rated-movies">
      <vue-horizontal :button="false" class="scroll-container">
        <MediaCard
          class="top-rated-card"
          v-for="movie in topRatedMovies"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        />
      </vue-horizontal>
    </section>
  </div>
</template>

<script>
import MediaCard from "./MediaCard.vue";
import VueHorizontal from "vue-horizontal";
import regionData from "../region_data.json";

export default {
  name: "TopRatedMovies",
  components: { MediaCard, VueHorizontal },
  data() {
    return {
      topRatedMovies: [],
      lang: "en-US",
      selectedRegion: "US",
      regions: regionData,
      sort_by: "top-rated.desc",
      page: 1,
      base_url: "https://image.tmdb.org/t/p/w500/",
      STATIC_API: "https://api.themoviedb.org/3/movie/top_rated",
    };
  },
  mounted: function () {
    this.getTopRatedMovies();
  },
  methods: {
    async getTopRatedMovies() {
      const response = await fetch(
        `${this.STATIC_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegion}`
        // `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      this.topRatedMovies = data.results;
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 5.5em;
  margin-bottom: 0;
  text-align: left;
  margin-left: 0.8em;
}

/* Hide MediaCard buttons for top-rated movies */
::v-deep .media-card figure {
  margin: 0;
  padding: 0;
  width: 100%;
}
::v-deep .media-card button,
::v-deep .media-card .view-media-btn {
  display: none;
}

/* Scroll container styling */
.scroll-container >>> .v-hl-container {
  gap: 2em;
  margin-bottom: 0;
  margin: 0 0 0 3em;
}

.scroll-container >>> .v-hl-container:not(.v-hl-scroll) {
  margin-bottom: 0;
}

/* Set how many horizontal cards to show on smaller screens */
@media (max-width: 768px) {
  .top-rated-card {
    width: calc((100% - (24px)) / 2.2);
  }
}
@media (min-width: 769px) {
  .top-rated-card {
    width: calc((100% - (24px)) / 7);
  }
}
</style>
