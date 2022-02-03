<template>
  <article class="card">
    <figure class="card-image">
      <img :src="poster_path" alt="" />
      <span class="tag is-success">{{ vote_average * 10 }}%</span>
    </figure>
    <div class="card-content">
      <div class="search-result-title">
        <h2 class="title is-5">
          {{ title }}
        </h2>
      </div>
      <p>{{ release_date | cutDate }}</p>
    </div>
    <SaveButton v-on:addToWatchList="saveMedia" />
    <router-link
      :to="{ name: 'MediaShow', params: { id: id } }"
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

<style scope>
.tag {
  position: absolute;
  top: 0;
  right: 0;
}

.card {
  max-width: 48%;
  margin-bottom: 2em;
}
</style>
