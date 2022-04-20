<template>
  <div class="home">
    <section class="hero">
      <h1>Find Where To Stream Any Movie</h1>
      <Search />
      <Waves />
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
    <!-- Slide container component for Popular Action -->
    <slide-container
      :type="popularAction"
      :selectedRegion="selectedRegionAction"
      :regions="regions"
      v-model="selectedRegionAction"
      v-on:fetchNewParam="getPopAction"
      ><template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in popAction"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        /> </template
    ></slide-container>
    <!-- Slide container component for Popular Comedy -->
    <slide-container
      :type="popularComedy"
      :selectedRegion="selectedRegionComedy"
      :regions="regions"
      v-model="selectedRegionComedy"
      v-on:fetchNewParam="getPopComedy"
      ><template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in popComedy"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        /> </template
    ></slide-container>
    <!-- Slide container component for Popular Documentaries -->
    <slide-container
      :type="popularDoc"
      :selectedRegion="selectedRegionDoc"
      :regions="regions"
      v-model="selectedRegionDoc"
      v-on:fetchNewParam="getPopDoc"
      ><template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in popDoc"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        /> </template
    ></slide-container>
    <!-- Slide container component for Popular Drama -->
    <slide-container
      :type="popularDrama"
      :selectedRegion="selectedRegionDrama"
      :regions="regions"
      v-model="selectedRegionDrama"
      v-on:fetchNewParam="getPopDrama"
      ><template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in popDrama"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        /> </template
    ></slide-container>
    <!-- Slide container component for Popular Drama -->
    <slide-container
      :type="popularHistory"
      :selectedRegion="selectedRegionHistory"
      :regions="regions"
      v-model="selectedRegionHistory"
      v-on:fetchNewParam="getPopHistory"
      ><template v-slot:media>
        <MediaCard
          class="type-card"
          v-for="movie in popHistory"
          :key="movie.id"
          :id="movie.id"
          :lang="movie.original_language"
          :type="movie.movie"
          :vote_average="movie.vote_average"
          :poster_path="`${base_url}${movie.poster_path}`"
        /> </template
    ></slide-container>
    <!-- Slide container component for Trending -->
    <h2>People Trending Globally</h2>
    <slide-container :type="trendingAll"
      ><template v-slot:media>
        <PersonCard
          class="type-card"
          v-for="person in trendingPeople"
          :key="person.id"
          :id="person.id"
          :name="person.name"
          :img_path="`${base_url}${person.profile_path}`"
        /> </template
    ></slide-container>
  </div>
</template>
<script>
import Search from "../components/Search.vue";
import Waves from "../components/Waves.vue";
import SlideContainer from "../components/SlideContainer.vue";
import MediaCard from "../components/MediaCard.vue";
import PersonCard from "../components/PersonCard.vue";
import regionData from "../region_data.json";
export default {
  name: "Home",
  components: {
    Search,
    Waves,
    SlideContainer,
    MediaCard,
    PersonCard,
  },
  data() {
    return {
      regions: regionData,
      selectedRegionTop: "US",
      selectedRegionPopular: "US",
      selectedRegionAction: "US",
      selectedRegionComedy: "US",
      selectedRegionDrama: "US",
      selectedRegionDoc: "US",
      selectedRegionHistory: "US",
      topRated: "Top Rated",
      popular: "Popular",
      popularAction: "Popular Action",
      popularComedy: "Popular Comedy",
      popularDrama: "Popular Drama",
      popularDoc: "Popular Documentaries",
      popularHistory: "Popular History",
      trendingAll: "People Trending Globally",
      sort_by: "popularity.desc",
      base_url: "https://image.tmdb.org/t/p/w500/",
      STATIC_TOP_API: "https://api.themoviedb.org/3/movie/top_rated",
      STATIC_GEN_API: "https://api.themoviedb.org/3/discover/movie",
      topRatedMovies: [],
      popularMovies: [],
      popAction: [],
      popComedy: [],
      popDrama: [],
      popDoc: [],
      popHistory: [],
      trendingPeople: [],
      page: 1,
      include_adult: false,
      include_video: false,
    };
  },
  mounted: function () {
    this.checkSearchHash();
    this.getPopular();
    this.getTopRated();
    this.getPopAction();
    this.getPopComedy();
    this.getPopDrama();
    this.getPopDoc();
    this.getPopHistory();
    this.getTrendingPeople();
  },
  methods: {
    async getPopular() {
      const response = await fetch(
        `${this.STATIC_GEN_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&sort_by=${this.sort_by}&include_adult=${this.include_adult}&include_video=${this.include_video}&language=${this.lang}&region=${this.selectedRegionPopular}&page=${this.page}`
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
    async getPopAction() {
      const response = await fetch(
        `${this.STATIC_TOP_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegionAction}&with_genres=28`
      );
      const data = await response.json();
      this.popAction = data.results;
    },
    async getPopComedy() {
      const response = await fetch(
        `${this.STATIC_GEN_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegionAction}&with_genres=35`
      );
      const data = await response.json();
      this.popComedy = data.results;
    },
    async getPopDrama() {
      const response = await fetch(
        `${this.STATIC_GEN_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegionDrama}&with_genres=18`
      );
      const data = await response.json();
      this.popDrama = data.results;
    },
    async getPopDoc() {
      const response = await fetch(
        `${this.STATIC_GEN_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegionDoc}&with_genres=99`
      );
      const data = await response.json();
      this.popDoc = data.results;
    },
    async getPopHistory() {
      const response = await fetch(
        `${this.STATIC_GEN_API}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&region=${this.selectedRegionHistory}&with_genres=36`
      );
      const data = await response.json();
      this.popHistory = data.results;
    },
    async getTrendingPeople() {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
      );
      const data = await response.json();
      this.trendingPeople = data.results;
    },
    checkSearchHash() {
      if (this.$route.hash === "#search") {
        document.querySelector("#searchInput").focus();
      }
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

h2 {
  font-size: 5.5em;
  margin-bottom: 0;
  text-align: left;
  margin-left: 0.8em;
  margin-bottom: 1.1em;
}
@media (min-width: 769px) {
  h1 {
    font-size: 10em;
  }
}

/* Set how many horizontal cards to show on each screen size */
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
@media (min-width: 1200px) {
  .type-card {
    width: calc((100% - (24px)) / 9);
  }
}
@media (min-width: 2000px) {
  .type-card {
    width: calc((100% - (24px)) / 12);
  }
}
</style>
