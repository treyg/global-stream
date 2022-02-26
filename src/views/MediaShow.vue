<template>
  <div>
    <main>
      <div class="background-container">
        <img :src="`${backdrop_base_url}${mediaInfo.backdrop_path}`" alt="" />
      </div>
      <section class="main-content">
        <div class="content-wrapper">
          <MediaCard
            :lang="mediaInfo.original_language"
            :tagline="mediaInfo.tagline"
            :title="mediaInfo.title"
            :summary="mediaInfo.overview"
            :vote_average="mediaInfo.vote_average"
            :release_date="mediaInfo.release_date"
            :poster_path="`${poster_base_url}${mediaInfo.poster_path}`"
          />
        </div>
      </section>
      <article class="where-to-watch">
        <div class="content-wrapper">
          <h2>Where to Stream</h2>
          <div class="providers">
            <WatchProviders
              v-for="provider in watchProviders"
              :key="provider.provider_id"
              :logo_path="`${poster_base_url}${provider.logo_path}`"
              @click.native="showCountriesAvailable(provider.provider_id)"
            />
          </div>
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
      locations: [],
      placesToWatch: [],
    };
  },
  methods: {
    async populateMediaInfo() {
      const response = await fetch(
        `${this.STATIC_API}/${this.mediaID}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&append_to_response=watch/providers,videos`
      );
      const data = await response.json();
      this.locations = data["watch/providers"].results;
      this.mediaInfo = data;

      // Filter to show only only countries with options to stream
      const streams = Object.entries(this.locations).filter((media) =>
        Object.prototype.hasOwnProperty.call(media[1], "flatrate")
      );
      //convert streams to object
      this.locations = streams.reduce((acc, curr) => {
        acc[curr[0]] = curr[1];
        return acc;
      }, {});
    },
    findProviders() {
      for (const property in this.locations) {
        for (const [key, value] of Object.entries(this.locations[property])) {
          if (key === "flatrate") {
            //Set each country stream options to an object
            Object.values(value).map((obj) => {
              this.watchProviders.push(obj);
              //Filter out duplicate providers by provider_id
              const uniqueIds = new Set();
              const filteredProviders = [];
              this.watchProviders.forEach((item) => {
                if (!uniqueIds.has(item.provider_id)) {
                  uniqueIds.add(item.provider_id);
                  filteredProviders.push(item);
                  this.watchProviders = filteredProviders;
                }
              });
            });
          }
        }
      }
    },
    showCountriesAvailable(platform_id) {
      //Map through the locations object and find the country with the matching platform_id
      const mappedProviders = Object.entries(this.locations).map((arr) => ({
        //Set indexes to the country name and the stream options
        country: arr[0],
        providerId: arr[1].flatrate[0].provider_id,
      }));
      this.placesToWatch = mappedProviders.filter(
        (provider) => provider.providerId == platform_id
      );
      alert(this.placesToWatch.map((provider) => provider.country));
    },
  },
  mounted: async function () {
    await this.populateMediaInfo();
    this.findProviders();
  },
};
</script>
<style scoped>
.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.content-wrapper {
  max-width: 93%;
  margin: auto;
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

::v-deep .media-card h2 {
  font-size: 4.5em;
  margin-bottom: 0.4em;
}

::v-deep .media-card p {
  font-size: 2.6em;
}

::v-deep .media-card figure {
  width: 47em;
  margin: auto auto 3em auto;
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
  font-size: 4.5em;
  margin: 0 0 1.2em 0;
  text-align: left;
}

.providers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2em;
}
</style>
