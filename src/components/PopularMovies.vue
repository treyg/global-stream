<template>
  <div>
    <h2>Popular Movies</h2>
    <section class="popular-movies">
      <vue-horizontal :button="false" class="scroll-container">
        <MediaCard
          class="popular-card"
          v-for="movie in popularMovies"
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

export default {
  name: "PopularMovies",
  components: { MediaCard, VueHorizontal },
  data() {
    return {
      popularMovies: [],
      lang: "en-US",
      region: "US",
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: false,
      page: 1,
      base_url: "https://image.tmdb.org/t/p/w500/",
      STATIC_API: "https://api.themoviedb.org/3/discover/movie",
    };
  },
  mounted: function () {
    this.getPopularMovies();
  },
  methods: {
    async getPopularMovies() {
      const response = await fetch(
        `${this.STATIC_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&sort_by=${this.sort_by}&include_adult=${this.include_adult}&include_video=${this.include_video}&language=${this.lang}&region=${this.region}&page=${this.page}`
      );
      const data = await response.json();
      this.popularMovies = data.results;
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

/* Hide MediaCard buttons for popular movies */
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
  .popular-card {
    width: calc((100% - (24px)) / 2.2);
  }
}
@media (min-width: 769px) {
  .popular-card {
    width: calc((100% - (24px)) / 4.3);
  }
}
</style>
