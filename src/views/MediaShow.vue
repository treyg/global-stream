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
        <h2>
          {{ mediaInfo.title }}
          <span>({{ mediaInfo.release_date | cutDate }})</span>
        </h2>
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
      lang: this.$route.params.lang,
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
        `${this.STATIC_API}/${this.mediaID}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&append_to_response=watch/providers,videos`
      );
      const data = await response.json();
      this.mediaInfo = data;
      //console.log(data);
    },
  },
  mounted() {
    this.populateMediaInfo();
  },
  filters: {
    cutDate(value) {
      return value.slice(0, 4);
    },
  },
};
</script>
<style scoped>
main {
}

.main-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #031318;
  color: #dde1e6;
}

.content-container {
  max-width: 90%;
}

h2 {
  font-size: 4.5em;
}

p {
  font-size: 2.6em;
}

.poster-container {
  margin-top: 4em;
}

.poster {
  width: 60em;
}

.background-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: none;
}

.background-container img {
  filter: brightness(0.26) contrast(0.9) grayscale(0.56) opacity(0.62);
}
</style>
