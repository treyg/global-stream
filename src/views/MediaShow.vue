<template>
  <main>
    <div class="background-container">
      <img :src="`${backdrop_base_url}${mediaInfo.backdrop_path}`" alt="" />
    </div>
    <section class="main-content">
      <div class="poster-container">
        <img
          :src="`${poster_base_url}${mediaInfo.poster_path}`"
          class="poster"
          alt="poster"
        />
      </div>
      <div class="content-container">
        <h2>{{ mediaInfo.title }}</h2>
        <p>{{ mediaInfo.overview }}</p>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  name: "MediaShow",
  data() {
    return {
      mediaInfo: [],
      mediaID: this.$route.params.id,
      lang: "en-US",
      backdrop_base_url: "https://image.tmdb.org/t/p/original",
      poster_base_url: "https://image.tmdb.org/t/p/w500",
      STATIC_API: "https://api.themoviedb.org/3/movie",
    };
  },
  methods: {
    getMediaId() {
      console.log(this.mediaInfo);
    },
    async populateMediaInfo() {
      const response = await fetch(
        `${this.STATIC_API}/${this.mediaID}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}`
      );
      const data = await response.json();
      this.mediaInfo = data;
      //console.log(data);
    },
  },
  mounted() {
    this.populateMediaInfo();
  },
};
</script>
<style scoped>
.background-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-container img {
  filter: brightness(0.66) contrast(0.9) grayscale(0.56) opacity(0.62);
}
.main-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}
</style>
