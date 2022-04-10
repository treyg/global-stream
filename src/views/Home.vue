<template>
  <div class="home">
    <section class="hero">
      <h1>Find Where To Stream Any Movie</h1>
      <Search />
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28 "
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z"
          />
        </defs>
        <g class="parallax1">
          <use xlink:href="#gentle-wave" x="50" y="3" fill="var(--success)" />
        </g>
        <g class="parallax2">
          <use xlink:href="#gentle-wave" x="50" y="0" fill="var(--primary)" />
        </g>
        <g class="parallax3">
          <use xlink:href="#gentle-wave" x="50" y="9" fill="var(--success)" />
        </g>
        <g class="parallax4">
          <use
            xlink:href="#gentle-wave"
            x="50"
            y="6"
            fill="var(--bg-primary)"
          />
        </g>
      </svg>
    </section>
    <!-- Slide container component for Popular Movies -->
    <slide-container
      :type="popular"
      :selectedRegion="selectedRegionPopular"
      :regions="regions"
      v-model="selectedRegionPopular"
      v-on:fetchNewParam="getPopular"
    >
      <template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in popularMovies"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`" /></template
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
      STATIC_TOP_API: "https://api.themoviedb.org/3/movie/top_rated",
      STATIC_POP_API: "https://api.themoviedb.org/3/discover/movie",
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
        `${this.STATIC_POP_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&sort_by=${this.sort_by}&include_adult=${this.include_adult}&include_video=${this.include_video}&language=${this.lang}&region=${this.selectedRegionPopular}&page=${this.page}`
      );
      const data = await response.json();
      this.popularMovies = data.results;
    },
    async getTopRated() {
      const response = await fetch(
        `${this.STATIC_TOP_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegionTop}`
      );
      const data = await response.json();
      this.topRatedMovies = data.results;
    },
  },
};
</script>

<style scoped>
.home {
  padding-bottom: 9rem;
}

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
  position: relative;
  margin-bottom: 20em;
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

/* SVG Waves */
.waves {
  display: block;
  width: 100%;
  height: 60px;
  max-height: 60px;
  margin: 0;
  z-index: 5;
  bottom: 0;
  position: absolute;
  left: 0px;
  float: left;
}
.parallax1 > use {
  animation: move-forever1 10s linear infinite;
}
.parallax1 > use:nth-child(1) {
  animation-delay: -2s;
}
.parallax2 > use {
  animation: move-forever2 8s linear infinite;
}
.parallax2 > use:nth-child(1) {
  animation-delay: -2s;
}
.parallax3 > use {
  animation: move-forever3 6s linear infinite;
}
.parallax3 > use:nth-child(1) {
  animation-delay: -2s;
}
.parallax4 > use {
  animation: move-forever4 4s linear infinite;
}
.parallax4 > use:nth-child(1) {
  animation-delay: -2s;
}
@keyframes move-forever1 {
  0% {
    transform: translate(85px, 0%);
  }
  100% {
    transform: translate(-90px, 0%);
  }
}
@keyframes move-forever2 {
  0% {
    transform: translate(-90px, 0%);
  }
  100% {
    transform: translate(85px, 0%);
  }
}
@keyframes move-forever3 {
  0% {
    transform: translate(85px, 0%);
  }
  100% {
    transform: translate(-90px, 0%);
  }
}
@keyframes move-forever4 {
  0% {
    transform: translate(-90px, 0%);
  }
  100% {
    transform: translate(85px, 0%);
  }
}
</style>
