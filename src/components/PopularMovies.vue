<template>
  <div>
    <h2 class="title is-2">Popular Movies</h2>
    <section class="popular-movies section">
      <MediaCard
        v-for="{
          movie,
          id,
          title,
          vote_average,
          original_language,
          release_date,
          poster_path,
          overview,
        } in popularMovies"
        :key="id"
        :id="id"
        :lang="original_language"
        :title="title"
        :type="movie"
        :summary="overview"
        :vote_average="vote_average"
        :release_date="release_date"
        :poster_path="`${base_url}${poster_path}`"
      />
    </section>
  </div>
</template>

<script>
import MediaCard from "./MediaCard.vue";
export default {
  name: "PopularMovies",
  components: { MediaCard },
  data() {
    return {
      popularMovies: [],
      lang: "en-US",
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: false,
      page: 1,
      base_url: "https://image.tmdb.org/t/p/w500",
      STATIC_API: "https://api.themoviedb.org/3/discover/movie",
    };
  },
  mounted: function () {
    this.getPopularMovies();
  },
  methods: {
    async getPopularMovies() {
      const response = await fetch(
        `${this.STATIC_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&sort_by=${this.sort_by}&include_adult=${this.include_adult}&include_video=${this.include_video}&page=${this.page}`
      );
      const data = await response.json();
      this.popularMovies = data.results;
      //console.log(data.results);
    },
  },
};
</script>

<style scoped>
.popular-movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2em;
}
</style>
