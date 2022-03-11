<template>
  <div class="home">
    <section class="hero">
      <h1>Find Where To Stream Any Movie</h1>
      <Search />
    </section>
    <!-- Slide container component for Popular Movies -->
    <slide-container
      :type="popular"
      :selectedRegion="selectedRegionPopular"
      :regions="regions"
      v-model="selectedRegionPopular"
      v-on:fetchNewParam="getPopular"
      ><template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in popularMovies"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        /> </template
    ></slide-container>
    <!-- Slide container component for Top Rated Movies -->
    <slide-container
      :type="topRated"
      :selectedRegion="selectedRegionTop"
      :regions="regions"
      v-model="selectedRegionTop"
      v-on:fetchNewParam="getTopRated"
      ><template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in topRatedMovies"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        /> </template
    ></slide-container>
  </div>
</template>
<script>
import Search from "../components/Search.vue";
import SlideContainer from "../components/SlideContainer.vue";
import MediaCard from "../components/MediaCard.vue";
import regionData from "../region_data.json";
export default {
  name: "Home",
  components: {
    Search,
    SlideContainer,
    MediaCard,
  },
  data() {
    return {
      regions: regionData,
      selectedRegionTop: "US",
      selectedRegionPopular: "US",
      topRated: "Top Rated",
      popular: "Popular",
      sort_by: "popularity.desc",
      base_url: "https://image.tmdb.org/t/p/w500/",
      STATIC_TOP: "https://api.themoviedb.org/3/movie/top_rated",
      STATIC_POP: "https://api.themoviedb.org/3/discover/movie",
      topRatedMovies: [],
      popularMovies: [],
      page: 1,
      include_adult: false,
      include_video: false,
    };
  },
  mounted: function () {
    this.getPopular();
    this.getTopRated();
  },
  methods: {
    async getPopular() {
      const response = await fetch(
        `${this.STATIC_POP}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&sort_by=${this.sort_by}&include_adult=${this.include_adult}&include_video=${this.include_video}&language=${this.lang}&region=${this.selectedRegionPopular}&page=${this.page}`
      );
      const data = await response.json();
      this.popularMovies = data.results;
    },
    async getTopRated() {
      const response = await fetch(
        `${this.STATIC_TOP}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegionTop}`
      );
      const data = await response.json();
      this.topRatedMovies = data.results;
    },
  },
};
</script>

<style scoped>
.hero {
  height: 100%;
  background-image: linear-gradient(
    180deg,
    hsl(206deg 29% 9%) 0%,
    hsl(204deg 25% 11%) 28%,
    hsl(203deg 23% 13%) 41%,
    hsl(202deg 22% 14%) 52%,
    hsl(201deg 21% 15%) 62%,
    hsl(201deg 20% 16%) 73%,
    hsl(200deg 20% 17%) 86%,
    hsl(200deg 19% 18%) 100%
  );
  display: flex;
  flex-direction: column;
  padding: 25em 0 15em;
}

h1 {
  font-size: 8em;
  margin: 0 auto 0.8em auto;
  max-width: 11em;
  line-height: 1.1;
  background: -webkit-linear-gradient(
    45deg,
    var(--primary),
    var(--success) 80%
  );
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (min-width: 769px) {
  h1 {
    font-size: 10em;
  }
}

/* Set how many horizontal cards to show on smaller screens */
@media (max-width: 768px) {
  .type-card {
    width: calc((100% - (24px)) / 2.2);
  }
}
@media (min-width: 769px) {
  .type-card {
    width: calc((100% - (24px)) / 7);
  }
}
</style>
