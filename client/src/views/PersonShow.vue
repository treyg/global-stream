<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <section class="main-content">
    <div class="content-wrapper">
      <div class="col-sm">
        <PersonCard
          :key="person.id"
          :name="person.name"
          :img_path="`${img_base_url}${person.profile_path}`"
        />
        <h3 v-if="person.birthday">Birthday</h3>
        <p v-if="person.birthday">{{ person.birthday }}</p>
        <h3 v-if="person.place_of_birth">Born In</h3>
        <p v-if="person.place_of_birth">{{ person.place_of_birth }}</p>
        <h3 v-if="person.deathday">Died</h3>
        <p v-if="person.deathday">{{ person.deathday }}</p>
      </div>
      <div class="col-lg">
        <h3 v-if="person.biography">Biography</h3>
        <p>{{ person.biography }}</p>
        <div class="credit-wrapper">
          <h3>Acted in</h3>
          <div class="credit-container">
            <MediaCard
              v-for="credit in acting_credits"
              v-if="credit.poster_path"
              :key="credit.credit_id"
              :id="credit.id"
              :lang="credit.original_language"
              :title="credit.title"
              :type="credit.media_type"
              :vote_average="credit.vote_average"
              :poster_path="`${img_base_url}${credit.poster_path}`"
            />
          </div>
          <h3>Directed</h3>
          <div class="credit-container">
            <MediaCard
              v-for="credit in director_credits"
              v-if="credit.poster_path"
              :key="credit.credit_id"
              :id="credit.id"
              :lang="credit.original_language"
              :title="credit.title"
              :type="credit.media_type"
              :vote_average="credit.vote_average"
              :poster_path="`${img_base_url}${credit.poster_path}`"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PersonCard from "../components/PersonCard.vue";
import MediaCard from "../components/MediaCard.vue";
export default {
  name: "PersonShow",
  components: { PersonCard, MediaCard },
  data() {
    return {
      personID: this.$route.params.id,
      img_base_url: "https://image.tmdb.org/t/p/w500",
      STATIC_API: "https://api.themoviedb.org/3/person",
      person: [],
      combined_credits: [],
      acting_credits: [],
      director_credits: [],
    };
  },
  methods: {
    //fetch person info
    async fetchPersonInfo() {
      const response = await fetch(
        `${this.STATIC_API}/${this.personID}?api_key=${process.env.VUE_APP_TMDB_API_KEY}&append_to_response=combined_credits`
      );
      const data = await response.json();
      this.person = data;
      this.combined_credits = data.combined_credits;
      this.acting_credits = data.combined_credits.cast;
      this.director_credits = data.combined_credits.crew.filter(
        (credit) => credit.job === "Director"
      );
    },
  },
  created: async function () {
    await this.fetchPersonInfo();
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
  padding-top: 6em;
  text-align: left;
}

h3 {
  font-size: 4.2em;
  margin: 1.2em auto 0.6em;
}

p {
  font-size: 2.6em;
  margin: 0;
}

.credit-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21em, 1fr));
  gap: 4em;
  margin-bottom: 20em;
}
/* Styling for person card component */
::v-deep .person-card a {
  pointer-events: none;
  cursor: default;
}

::v-deep .person-card figure {
  width: 60em;
  margin: auto;
}

::v-deep .person-card h4 {
  font-size: 6em;
  text-align: center;
}

/* Hide media card elements */
::v-deep .media-card .hero-content-wrapper,
::v-deep .media-card .button-container {
  display: none;
}

::v-deep .media-card {
  padding: 0;
}

::v-deep .media-card figure {
  width: 100%;
  margin: 0;
}

@media (min-width: 769px) {
  .content-wrapper {
    display: flex;
    gap: 10em;
  }
}
</style>