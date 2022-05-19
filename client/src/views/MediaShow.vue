<template>
  <div>
    <main>
      <div class="background-container">
        <img :src="`${backdrop_base_url}${mediaInfo.backdrop_path}`" alt="" />
      </div>
      <section class="main-content">
        <div class="content-wrapper">
          <media-card
            :lang="mediaInfo.original_language"
            :tagline="mediaInfo.tagline"
            :title="mediaInfo.title || mediaInfo.original_name"
            :summary="mediaInfo.overview"
            :runtime="runtime"
            :rating="getDefaultRating"
            :vote_average="mediaInfo.vote_average"
            :release_date="releaseDate"
            :poster_path="`${poster_base_url}${mediaInfo.poster_path}`"
          >
            <template slot="genre">
              <span v-for="genre in mediaInfo.genres" :key="genre.id">
                {{ genre.name }}
              </span>
            </template>
          </media-card>
        </div>
      </section>
      <!-- Stream provider section -->
      <article class="where-to-watch">
        <div class="content-wrapper">
          <h2 v-if="watchProviders">Where to Stream</h2>
          <div class="providers">
            <WatchProviders
              v-for="provider in watchProviders"
              :key="provider.provider_id"
              :provider_name="provider.provider_name"
              :logo_path="`${poster_base_url}${provider.logo_path}`"
              @click.native="showCountriesAvailable(provider.provider_id)"
            />
          </div>
        </div>
      </article>
      <!-- Director Section -->
      <article>
        <div class="content-wrapper">
          <h2>Director</h2>
          <div class="director">
            <PersonCard
              v-for="director in directors"
              :key="director.id"
              :name="director.name"
              :img_path="`${poster_base_url}${director.profile_path}`"
              :id="director.id"
            />
          </div>
        </div>
      </article>
      <!-- Cast Section -->
      <article>
        <div class="content-wrapper">
          <h2>Cast</h2>
          <div class="cast">
            <PersonCard
              v-for="person in cast.slice(0, 9)"
              :key="person.id"
              :name="person.name"
              :character="person.character"
              :img_path="`${poster_base_url}${person.profile_path}`"
              :id="person.id"
            />
          </div>
        </div>
      </article>

      <!-- Stream option modal -->
      <location-modal v-if="showModal" @close="showModal = false">
        <template v-slot:countries>
          <ul>
            <li
              v-for="country in placesToWatch"
              :key="country.id"
              :country="country.country"
            >
              {{ country.country | fullCountryName }}
            </li>
          </ul>
        </template>
      </location-modal>
    </main>
  </div>
</template>
<script>
import WatchProviders from "../components/WatchProviders.vue";
import MediaCard from "../components/MediaCard.vue";
import PersonCard from "../components/PersonCard.vue";
import LocationModal from "../components/LocationModal.vue";
export default {
  name: "MediaShow",
  components: { WatchProviders, MediaCard, PersonCard, LocationModal },
  data() {
    return {
      showModal: false,
      mediaInfo: [],
      mediaID: this.$route.params.id,
      lang: this.$route.params.lang,
      mediaType: null,
      backdrop_base_url: "https://image.tmdb.org/t/p/original",
      poster_base_url: "https://image.tmdb.org/t/p/w500",
      STATIC_API: "https://api.themoviedb.org/3/",
      //
      watchProviders: [],
      locations: [],
      placesToWatch: [],
      cast: [],
      rating: [],
      directors: [],
    };
  },
  methods: {
    async populateMediaInfo() {
      const response = await fetch(
        `${this.STATIC_API}/${this.mediaType}/${this.mediaID}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=${this.lang}&append_to_response=watch/providers,videos,credits,release_dates,similar,recommendations`
      );
      const data = await response.json();
      this.locations = data["watch/providers"].results;
      this.mediaInfo = data;
      this.cast = data.credits.cast;
      //this.rating = data.release_dates.results;

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
            //Set each country's stream options to an object
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
      const mappedProviders = Object.entries(this.locations).map(
        //Set indexes to the country name and the stream options
        ([country, provider]) => ({
          country,
          //Check if the country has a flatrate stream option - up to 4
          providerId: provider.flatrate[0].provider_id,
          provider_IdAlt: provider.flatrate[1]?.provider_id || null,
          provider_IdAlt2: provider.flatrate[2]?.provider_id || null,
          provider_IdAlt3: provider.flatrate[3]?.provider_id || null,
          provider_IdAlt4: provider.flatrate[4]?.provider_id || null,
        })
      );
      //Filter out the countries with the matching platform_id
      this.placesToWatch = mappedProviders.filter((provider) => {
        //Destructure the provider object
        const {
          providerId,
          provider_IdAlt,
          provider_IdAlt2,
          provider_IdAlt3,
          provider_IdAlt4,
        } = provider;
        //Check if the country provider_id matches the platform_id
        return [
          providerId,
          provider_IdAlt,
          provider_IdAlt2,
          provider_IdAlt3,
          provider_IdAlt4,
        ].includes(platform_id);
      });
      //Set placesToWatch as provider.country
      this.placesToWatch.map((provider) => {
        provider.country;
      });
      this.showModal = true;
    },
    checkMediaType() {
      if (this.$route.params.mediaType === undefined) {
        this.mediaType = "movie";
      } else {
        this.mediaType = this.$route.params.mediaType;
      }
    },
    getDirectors() {
      if (this.mediaType === "movie") {
        this.directors = this.mediaInfo.credits.crew.filter(
          (crew) => crew.job === "Director"
        );
      } else {
        this.directors = this.mediaInfo.credits.crew.filter(
          (crew) => crew.job === "Executive Producer"
        );
      }
    },
  },
  filters: {
    fullCountryName(country) {
      const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
        type: "region",
      });
      return regionNamesInEnglish.of(country);
    },
  },
  mounted: async function () {
    await this.populateMediaInfo();
    this.findProviders();
    this.getDirectors();
  },
  beforeMount() {
    this.checkMediaType();
  },
  computed: {
    getDefaultRating: function () {
      //Show the first item for the US location
      const firstUS = [...this.rating].find((item) => item.iso_3166_1 === "US");
      if (!firstUS) return null;
      return firstUS.release_dates[0].certification;
    },
    runtime: function () {
      if (this.mediaType === "movie") {
        return this.mediaInfo.runtime;
      } else {
        return this.mediaInfo.episode_run_time?.[0];
      }
    },
    releaseDate: function () {
      if (this.mediaType === "movie") {
        return this.mediaInfo.release_date;
      } else {
        return this.mediaInfo.first_air_date;
      }
    },
  },
};
</script>
<style scoped>
main {
  padding-bottom: 5em;
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

::v-deep .media-card a {
  pointer-events: none;
  cursor: default;
}

::v-deep .media-card h2 {
  font-size: 4.5em;
  margin-bottom: 0;
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

::v-deep .media-card .view-media-btn {
  display: none;
}

/* Container for genres */
::v-deep .genre_wrapper span {
  background-color: var(--icon);
  padding: 0.1em 0.4em;
  border-radius: 0.2em;
}

/* Style local modal list */
::v-deep .modal-mask ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
}

.where-to-watch {
  width: 100%;
  background-color: var(--bg-primary);
}

h2 {
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

.cast {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21em, 1fr));
  gap: 4em;
  margin-bottom: 10rem;
}

.director {
  display: flex;
  justify-content: center;
}

/* desktop adjustments */
@media (min-width: 769px) {
  ::v-deep .hero-content-wrapper {
    margin-left: 7em;
  }

  .providers {
    justify-content: start;
  }

  .director {
    display: flex;
    justify-content: start;
  }
}
</style>
