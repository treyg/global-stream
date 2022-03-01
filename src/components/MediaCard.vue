<template>
  <article class="media-card">
    <figure class="card-image">
      <img :src="poster_path" alt="" />
      <span class="votes">{{ vote_average * 10 }}%</span>
    </figure>
    <div class="card-content">
      <div class="search-result-title">
        <p class="release-date" v-if="release_date">
          {{ release_date | cutDate }}
        </p>
        <h2>
          {{ title }}
        </h2>
        <h3 v-if="tagline">"{{ tagline }}"</h3>
      </div>
      <p v-if="summary">{{ summary }}</p>
    </div>
    <SaveButton v-on:addToWatchList="saveMedia" />
    <router-link
      class="view-media"
      :to="{ name: 'MediaShow', params: { id: id, lang: lang } }"
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
}

h2 {
  font-size: 4.4em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 3.5em;
  font-style: italic;
  margin: 0 0 0.2em 0;
}

p {
  font-size: 2.5em;
  margin: 0 0 1.5em 0;
}

.release-date {
  font-size: 2.8em;
  margin: 0;
}

figure {
  position: relative;
  margin-bottom: 3em;
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

.view-media {
  color: white;
  font-size: 2.5em;
  text-decoration: none;
}
</style>
