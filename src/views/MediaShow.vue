<template>
  <div>
    <main>
      <div class="background-container">
        <img :src="`${backdrop_base_url}${mediaInfo.backdrop_path}`" alt="" />
      </div>
      <section class="main-content">
        <!-- <div class="poster-container">
          <img
            :src="`${poster_base_url}${mediaInfo.poster_path}`"
            class="poster"
            alt="Movie poster"
          />
        </div>
        <div class="content-container">
          <h2>
            {{ mediaInfo.title }}
            <span v-if="mediaInfo.release_date"
              >({{ mediaInfo.release_date | cutDate }})</span
            >
          </h2>
          <h3 v-if="mediaInfo.tagline">"{{ mediaInfo.tagline }}"</h3>
          <p>{{ mediaInfo.overview }}</p>
        </div> -->
        <MediaCard
          :lang="mediaInfo.original_language"
          :tagline="mediaInfo.tagline"
          :title="mediaInfo.title"
          :summary="mediaInfo.overview"
          :vote_average="mediaInfo.vote_average"
          :release_date="mediaInfo.release_date"
          :poster_path="`${poster_base_url}${mediaInfo.poster_path}`"
        />
      </section>
      <article class="where-to-watch">
        <h2>Where to Watch</h2>
        <div class="providers">
          <WatchProviders
            v-for="provider in watchProviders"
            :key="provider.id"
            :logo_path="`${poster_base_url}${provider.logo_path}`"
            v-on:show-locations="showLocations"
          />
        </div>
      </article>
    </main>
  </div>
</template>
<script>
import WatchProviders from "../components/WatchProviders.vue";
import MediaCard from "../components/MediaCard.vue";
export default {
  name: "MediaShow",
  components: { WatchProviders, MediaCard },
  data() {
    return {
      mediaInfo: [],
      mediaID: this.$route.params.id,
      lang: this.$route.params.lang,
      backdrop_base_url: "https://image.tmdb.org/t/p/original",
      poster_base_url: "https://image.tmdb.org/t/p/w500",
      STATIC_API: "https://api.themoviedb.org/3/movie",
      //
      watchProviders: [],
      countries: [],
      streamable: [],
    };
  },
  methods: {
    async populateMediaInfo() {
      const response = await fetch(
        `${this.STATIC_API}/${this.mediaID}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&append_to_response=watch/providers,videos`
      );
      const data = await response.json();
      this.countries = data["watch/providers"].results;
      this.mediaInfo = data;
    },
    showStreamable() {
      const streams = Object.entries(this.countries).filter((media) =>
        Object.prototype.hasOwnProperty.call(media[1], "flatrate")
      );
      //convert streams to object
      this.streamable = streams.reduce((acc, curr) => {
        acc[curr[0]] = curr[1];
        return acc;
      }, {});
    },
    findProviders() {
      for (const property in this.streamable) {
        // for (const key in this.streamable[property]) {
        //   console.log(key);
        // }
        for (const [key, value] of Object.entries(this.streamable[property])) {
          if (key === "flatrate") {
            //Set each country stream options to an object
            const countryObj = Object.values(value);
            //console.log(JSON.stringify(countryObj));
            //Return streaming options for each country object and push to array
            Object.keys(countryObj).forEach((key) => {
              const flatRateArr = Object.values(countryObj[key]);
              this.watchProviders.push(flatRateArr[3]);
              console.log(this.watchProviders);
            });
          }
        }
      }
    },
    showLocations() {
      console.log("showLocations");
    },
  },
  // created() {
  //   this.populateMediaInfo();
  // },
  mounted: async function () {
    await this.populateMediaInfo();
    this.showStreamable();
    this.findProviders();
    //this.showLocations();
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
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-primary);
  color: var(--text-primary);
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

article {
  margin: 0;
}

/* MediaCard Child component styles */
::v-deep .media-card {
}

::v-deep .media-card h2 {
  font-size: 4.5em;
  margin-bottom: 0.4em;
}

::v-deep .media-card h3 {
  font-size: 3.5em;
  font-style: italic;
  margin: 0 0 0.2em 0;
}

::v-deep .media-card p {
  font-size: 2.6em;
}

::v-deep .media-card figure {
  width: 47em;
  margin: auto;
  position: relative;
}

::v-deep .media-card .card-image img {
  width: 47em;
  margin: auto;
  box-shadow: 0 0.5em 1.3em 0.7em rgba(13, 35, 42, 0.54);
}

.where-to-watch {
  width: 100%;
  background-color: var(--bg-primary);
}

.where-to-watch h2 {
  font-size: 3.5em;
  margin: 0 0 0.4em 0;
  text-align: left;
}

.providers {
  display: flex;
  justify-content: center;
  gap: 2em;
}
</style>
