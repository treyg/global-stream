<template>
  <article class="media-card">
    <figure class="card-image">
      <img :src="poster_path" alt="" />
      <span class="votes">{{ vote_average * 10 }}%</span>
    </figure>
    <div class="card-content">
      <div class="search-result-title">
        <p>{{ release_date | cutDate }}</p>
        <h2>
          {{ title }}
        </h2>
        <h3 v-if="tagline">"{{ tagline }}"</h3>
      </div>
      <p v-if="summary">{{ summary }}</p>
    </div>
    <SaveButton v-on:addToWatchList="saveMedia" />
    <router-link
      :to="{ name: 'MediaShow', params: { id: id, lang: lang } }"
      class="button is-primary"
    >
      view
    </router-link>
  </article>
</template>

<script>
import axios from "axios";
import SaveButton from "./SaveButton.vue";

export default {
  name: "MediaCard",
  components: { SaveButton },
  props: {
    title: String,
    vote_average: {
      type: [String, Number],
    },
    release_date: String,
    poster_path: String,
    summary: String,
    tagline: String,
    link: String,
    lang: String,
    url: String,
    type: String,
    onList: Boolean,
    media: {},
    id: Number,
    //Media Provider Data
    provider: String,
    provider_logo: String,
  },
  methods: {
    saveMedia() {
      //function to push prop data to watchlist
      axios
        .post("http://localhost:3000/", {
          title: this.title,
          summary: this.summary,
          url: this.url,
          type: this.type,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showID() {
      console.log(this.lang);
    },
  },
  filters: {
    cutDate(value) {
      return value.slice(0, 4);
    },
  },
};
</script>

<style scoped>
.media-card {
  margin-top: 4em;
}

.votes {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5em;
  width: 3.5em;
  display: block;
  border-top-right-radius: 0.32em;
  background-color: var(--success);
}

.card {
  margin-bottom: 2em;
}
</style>
